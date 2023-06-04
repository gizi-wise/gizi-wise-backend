import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@common/dto/pagination.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { FileUploadLogDto } from './file-upload-log.dto';

class ListFileUploadLogDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileUploadLogDto)
  categories: FileUploadLogDto[];
}

export class ResponseListFileUploadLogDto extends IntersectionType(
  PaginationDto,
  ListFileUploadLogDto,
) {
  constructor(partial: ResponseListFileUploadLogDto) {
    super();
    partial.totalPage = Math.ceil(partial.totalData / partial.limit) || 1;
    validateAndTransformData.call(this, partial);
  }
}
