import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { CategoryDto } from '@gizi-wise/category/dto/category.dto';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Product, ProductType } from '../entities/product.entity';
import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { TkpiDto } from '@gizi-wise/tkpi/dto/tkpi.dto';

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

  @IsOptionalWithEmptyString()
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

  @IsOptionalWithEmptyString()
  @IsArray()
  @Type(() => TkpiDto)
  tkpis: TkpiDto[];

  constructor(data: Product, omit: string[] = []) {
    validateAndTransformData.call(this, data, omit);
  }
}
