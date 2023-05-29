import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { IsNumber } from 'class-validator';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from './create-category.dto';

export class CategoryDto extends CreateCategoryDto {
  @IsOptionalWithEmptyString()
  @IsNumber()
  id?: number;

  constructor(data: Category, omit: string[] = []) {
    super();
    validateAndTransformData.call(this, data, omit);
  }
}
