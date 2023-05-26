import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { InternalServerErrorException } from '@nestjs/common';
import { IsNotEmpty, IsString, validateSync, IsNumber } from 'class-validator';
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
    Object.assign(this, data instanceof Category ? data.toJSON() : data);
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
