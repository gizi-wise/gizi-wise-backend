import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@common/dto/pagination.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { ProductDto } from './product.dto';
import { validateAndTransformData } from '@common/functions/validateAndTransformData';

class ListProduct {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}

export class ResponseListProductDto extends IntersectionType(
  PaginationDto,
  ListProduct,
) {
  constructor(partial: ResponseListProductDto) {
    super();
    partial.totalPage = Math.ceil(partial.totalData / partial.limit) || 1;
    validateAndTransformData.call(this, partial);
  }
}
