import { IsArray, ValidateNested, validateSync } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@common/dto/pagination.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { InternalServerErrorException } from '@nestjs/common';
import { CategoryDto } from './category.dto';

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
  constructor(partial: Omit<ResponseListCategoryDto, 'totalPage'>) {
    super();
    Object.assign(this, partial);
    this.totalPage = Math.ceil(this.totalData / this.limit) || 1;
    const errors = validateSync(this, {
      validationError: { target: true },
      whitelist: true,
    });
    if (errors.length > 0) {
      throw new InternalServerErrorException(errors);
    }
  }
}
