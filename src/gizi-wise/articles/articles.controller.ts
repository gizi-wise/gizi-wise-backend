import { CloudStorageService } from '@common/cloud-storage/cloud-storage.service';
import { LoggedUser } from '@common/decorators/logged-user.decorator';
import { RawBody } from '@common/decorators/raw-body.decorator';
import { validateMultipartFormFile } from '@common/functions/validate-multipart-form-file';
import { Role } from '@gizi-wise/admin/entities/admin.entity';
import { Auth } from '@gizi-wise/auth/auth.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { ResponseListArticleDto } from './dto/list-article.dto';
import { QueryListArticleDto } from './dto/query-list-product.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { UploadImageArticleDto } from './dto/upload-image-article.dto';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly cloudStorageService: CloudStorageService,
  ) {}

  @Post('/upload-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload image',
    type: UploadImageArticleDto,
  })
  @Auth(Role.ADMIN)
  async uploadImage(
    @LoggedUser() user: any,
    @RawBody()
    body: UploadImageArticleDto,
  ) {
    const result = {
      field: '',
      url: '',
    };
    const { image } = body;
    validateMultipartFormFile(image, {
      allowedExtension: 'image',
      allowedMimeType: 'image',
    });
    if (image.file) {
      if (image.mime_type.split('/')[0] === 'image') {
        const url = await this.cloudStorageService.uploadFile({
          destination: `images/articles/${Date.now()}-${image.file.name}`,
          contentType: image.mime_type,
          file: image.file.buffer,
          moduleName: 'articles',
          uploader: {
            id: user.id,
            role: user.role,
          },
        });
        result.field = image.name;
        result.url = url;
      }
    }
    return result;
  }

  @Post()
  @Auth(Role.ADMIN)
  create(@LoggedUser() user: any, @Body() createArticleDto: CreateArticleDto) {
    createArticleDto.authorId = user.id;
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  async findAll(
    @Query() query: QueryListArticleDto,
  ): Promise<ResponseListArticleDto> {
    const { page, limit } = query;
    query.offset = (page - 1) * limit;
    const { articles, count } = await this.articlesService.findAll(query);
    return new ResponseListArticleDto({
      articles,
      page,
      limit,
      totalData: count,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
