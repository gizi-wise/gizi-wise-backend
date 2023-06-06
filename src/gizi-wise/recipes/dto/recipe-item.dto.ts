import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { Admin } from '@gizi-wise/admin/entities/admin.entity';
import { Type } from 'class-transformer';
import {
  Allow,
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
} from 'class-validator';
import { Recipe } from '../entities/recipe.entity';
import { RecipeTagDto } from './recipe-tag.dto';

export class RecipeItemDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsOptionalWithEmptyString()
  @IsString()
  summary?: string;

  @IsOptionalWithEmptyString()
  @IsString()
  image?: string;

  @IsOptionalWithEmptyString()
  @IsBoolean()
  isFeatured?: boolean;

  @IsString()
  authorId: string;

  @Allow()
  @Type(() => Admin)
  author: Admin;

  @IsArray()
  @Type(() => RecipeTagDto)
  recipeTags: RecipeTagDto[];

  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;

  constructor(data: Recipe, omit?: string[]) {
    validateAndTransformData.call(this, data, omit);
  }
}
