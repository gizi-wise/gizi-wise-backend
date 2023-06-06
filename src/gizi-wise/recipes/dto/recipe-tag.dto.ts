import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { TagDto } from '@gizi-wise/tags/dto/tag.dto';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { RecipeTag } from '../entities/recipe-tag.entity';
import { Recipe } from '../entities/recipe.entity';

export class RecipeTagDto {
  @IsOptionalWithEmptyString()
  @IsNumber()
  id: number;

  @IsOptionalWithEmptyString()
  @IsNumber()
  recipeId: number;

  @IsOptionalWithEmptyString()
  @Type(() => Recipe)
  recipe: Recipe;

  @IsOptionalWithEmptyString()
  @IsNumber()
  tagId: number;

  @IsOptionalWithEmptyString()
  @Type(() => TagDto)
  tag: TagDto;

  constructor(data: RecipeTag, omit?: string[]) {
    validateAndTransformData.call(this, data, omit);
  }
}
