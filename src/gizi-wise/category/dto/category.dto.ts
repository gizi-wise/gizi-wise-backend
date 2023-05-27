import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Category } from '../entities/category.entity';

export class CategoryDto {
  @IsOptionalWithEmptyString()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptionalWithEmptyString()
  @IsString()
  description?: string;

  @IsOptionalWithEmptyString()
  @IsString()
  image?: string;

  constructor(data: Category, omit: string[] = []) {
    validateAndTransformData.call(this, data, omit);
  }
}
