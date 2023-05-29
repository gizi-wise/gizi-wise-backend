import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { CategoryDto } from '@gizi-wise/category/dto/category.dto';
import { IsNumber, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { Product } from '../entities/product.entity';
import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { TkpiDto } from '@gizi-wise/tkpi/dto/tkpi.dto';
import { CreateProductDto } from './create-product.dto';

export class ProductDto extends CreateProductDto {
  @IsOptionalWithEmptyString()
  @IsNumber()
  id?: number;

  @IsOptionalWithEmptyString()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @IsOptionalWithEmptyString()
  @IsArray()
  @Type(() => TkpiDto)
  tkpis: TkpiDto[];

  constructor(data: Product, omit: string[] = []) {
    super();
    validateAndTransformData.call(this, data, omit);
  }
}
