import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@common/dto/pagination.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { validateAndTransformData } from '@common/functions/validateAndTransformData';

class ListUser {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  users: UserDto[];
}

export class ResponseListUserDto extends IntersectionType(
  PaginationDto,
  ListUser,
) {
  constructor(partial: ResponseListUserDto) {
    super();
    partial.totalPage = Math.ceil(partial.totalData / partial.limit) || 1;
    validateAndTransformData.call(this, partial);
  }
}
