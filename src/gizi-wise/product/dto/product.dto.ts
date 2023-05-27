import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { CategoryDto } from '@gizi-wise/category/dto/category.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Product, ProductType } from '../entities/product.entity';
import { validateAndTransformData } from '@common/functions/validateAndTransformData';

export class ProductDto {
  @IsOptionalWithEmptyString()
  @IsNumber()
  id?: number;

  @IsOptionalWithEmptyString()
  @IsString()
  code?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptionalWithEmptyString()
  @IsString()
  latinName?: string;

  @IsOptionalWithEmptyString()
  @IsString()
  origin?: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @IsNotEmpty()
  @IsEnum(ProductType)
  type: ProductType;

  @IsOptionalWithEmptyString()
  @IsString()
  description?: string;

  @IsOptionalWithEmptyString()
  @IsString()
  image?: string;

  @IsOptionalWithEmptyString()
  @IsNumber()
  servingSize?: number;

  @IsOptionalWithEmptyString()
  @IsString()
  servingUnit?: string;

  @IsOptionalWithEmptyString()
  @IsNumber()
  ediblePortion?: number;

  constructor(data: Product, omit: string[] = []) {
    validateAndTransformData.call(this, data, omit);
  }
}
