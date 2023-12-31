import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Auth } from '@gizi-wise/auth/auth.decorator';
import { Role } from '@gizi-wise/admin/entities/admin.entity';
import { QueryListProductDto } from './dto/query-list-product.dto';
import { ResponseListProductDto } from './dto/list-product.dto';
import { CloudStorageService } from '@common/cloud-storage/cloud-storage.service';
import { UploadImageProductDto } from './dto/upload-image-product.dto';
import { RawBody } from '@common/decorators/raw-body.decorator';
import { validateMultipartFormFile } from '@common/functions/validate-multipart-form-file';
import { LoggedUser } from '@common/decorators/logged-user.decorator';
import {
  AcceptContentType,
  ContentTypes,
} from '@core/decorators/accept-content-type.decorator';
import { TkpiService } from '@gizi-wise/tkpi/tkpi.service';
import { ImagePredictionService } from '@common/image-prediction/image-prediction.service';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudStorageService: CloudStorageService,
    private readonly tkpiService: TkpiService,
    private readonly imagePredictionService: ImagePredictionService,
  ) {}

  @Post('/upload-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload image',
    type: UploadImageProductDto,
  })
  @Auth(Role.ADMIN)
  async uploadImage(
    @LoggedUser() user: any,
    @RawBody()
    body: UploadImageProductDto,
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
          destination: `images/products/${Date.now()}-${image.file.name}`,
          contentType: image.mime_type,
          file: image.file.buffer,
          moduleName: 'products',
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

  @Post('/search-by-image')
  @AcceptContentType(ContentTypes.FORM_DATA)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload image',
    type: UploadImageProductDto,
  })
  async searchByImage(
    @RawBody()
    body: UploadImageProductDto,
  ) {
    const result = {
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
          destination: `images/product-searchs/${Date.now()}-${
            image.file.name
          }`,
          contentType: image.mime_type,
          file: image.file.buffer,
          moduleName: 'products',
          uploader: {
            id: 'search-by-image',
            role: 'module',
          },
        });
        result.url = url;
      }
    }
    const code = await this.imagePredictionService.predictImage(result.url);
    if (!code) {
      throw new NotFoundException('Prediction result not found');
    }
    const product = await this.productService.findOneByCode(code);
    product.image = result.url;
    return product;
  }

  @Post()
  @Auth(Role.ADMIN)
  async create(@Body() createProductDto: CreateProductDto) {
    const { tkpis, ...productInfo } = createProductDto;
    const product = await this.productService.create(productInfo);
    for (const tkpi of tkpis) {
      await this.tkpiService.create({
        ...tkpi,
        productId: product.id,
      });
    }
    return this.productService.findOne(product.id);
  }

  @Get()
  async findAll(
    @Query() query: QueryListProductDto,
  ): Promise<ResponseListProductDto> {
    const { page, limit } = query;
    query.offset = (page - 1) * limit;
    const { products, count } = await this.productService.findAll(query);
    return new ResponseListProductDto({
      products,
      page,
      limit,
      totalData: count,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
