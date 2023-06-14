import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@common/dto/pagination.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { RecipeDto } from './recipe.dto';

class ListRecipe {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeDto)
  recipes: RecipeDto[];
}

export class ResponseListRecipeDto extends IntersectionType(
  PaginationDto,
  ListRecipe,
) {
  constructor(partial: ResponseListRecipeDto) {
    super();
    partial.totalPage = Math.ceil(partial.totalData / partial.limit) || 1;
    validateAndTransformData.call(this, partial);
  }
}
