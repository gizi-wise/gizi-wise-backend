import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@common/dto/pagination.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { TagDto } from './tag.dto';
import { validateAndTransformData } from '@common/functions/validateAndTransformData';

class ListTag {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  tags: TagDto[];
}

export class ResponseListTagDto extends IntersectionType(
  PaginationDto,
  ListTag,
) {
  constructor(partial: ResponseListTagDto) {
    super();
    partial.totalPage = Math.ceil(partial.totalData / partial.limit) || 1;
    validateAndTransformData.call(this, partial);
  }
}
