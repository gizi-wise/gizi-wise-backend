import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@common/dto/pagination.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { TkpiDto } from './tkpi.dto';
import { validateAndTransformData } from '@common/functions/validateAndTransformData';

class ListTkpi {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TkpiDto)
  tkpis: TkpiDto[];
}

export class ResponseListTkpiDto extends IntersectionType(
  PaginationDto,
  ListTkpi,
) {
  constructor(partial: ResponseListTkpiDto) {
    super();
    partial.totalPage = Math.ceil(partial.totalData / partial.limit) || 1;
    validateAndTransformData.call(this, partial);
  }
}
