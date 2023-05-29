import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@common/dto/pagination.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { CategoryDto } from './category.dto';
import { validateAndTransformData } from '@common/functions/validateAndTransformData';

class ListCategory {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories: CategoryDto[];
}

export class ResponseListCategoryDto extends IntersectionType(
  PaginationDto,
  ListCategory,
) {
  constructor(partial: ResponseListCategoryDto) {
    super();
    partial.totalPage = Math.ceil(partial.totalData / partial.limit) || 1;
    validateAndTransformData.call(this, partial);
  }
}
