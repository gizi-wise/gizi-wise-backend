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
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { ResponseListRecipeDto } from './dto/list-recipe.dto';
import { QueryListRecipeDto } from './dto/query-list-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { UploadImageRecipeDto } from './dto/upload-image-recipe.dto';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly cloudStorageService: CloudStorageService,
  ) {}

  @Post('/upload-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload image',
    type: UploadImageRecipeDto,
  })
  @Auth(Role.ADMIN)
  async uploadImage(
    @LoggedUser() user: any,
    @RawBody()
    body: UploadImageRecipeDto,
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
          destination: `images/recipes/${Date.now()}-${image.file.name}`,
          contentType: image.mime_type,
          file: image.file.buffer,
          moduleName: 'recipes',
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
  create(@LoggedUser() user: any, @Body() createRecipeDto: CreateRecipeDto) {
    createRecipeDto.authorId = user.id;
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  async findAll(
    @Query() query: QueryListRecipeDto,
  ): Promise<ResponseListRecipeDto> {
    const { page, limit } = query;
    query.offset = (page - 1) * limit;
    const { recipes, count } = await this.recipesService.findAll(query);
    return new ResponseListRecipeDto({
      recipes,
      page,
      limit,
      totalData: count,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recipesService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  update(@Param('id') id: number, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  }
}
