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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { AdminAuth } from '@gizi-wise/admin-auth/admin-auth.decorator';
import { AdminRole } from '@gizi-wise/admin/entities/admin.entity';
import { QueryListProductDto } from './dto/query-list-product.dto';
import { ResponseListProductDto } from './dto/list-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @AdminAuth(AdminRole.ADMIN)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
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
  @AdminAuth(AdminRole.ADMIN)
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @AdminAuth(AdminRole.ADMIN)
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
