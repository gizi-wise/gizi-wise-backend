import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { CategoryDto } from '@gizi-wise/category/dto/category.dto';
import { InternalServerErrorException } from '@nestjs/common';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Product, ProductType } from '../entities/product.entity';

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
    Object.assign(this, data instanceof Product ? data.toJSON() : data);
    const errors = validateSync(this, {
      validationError: { target: true },
      whitelist: true,
    });
    if (errors.length > 0) {
      throw new InternalServerErrorException(errors);
    }
    if (omit.length) {
      omit.forEach((key) => delete this[key]);
    }
  }
}
