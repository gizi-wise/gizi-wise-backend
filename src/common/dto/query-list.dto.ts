import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min } from 'class-validator';

export class QueryListDto {
  @ApiProperty({
    type: 'string',
    description:
      'sort by any property name, such as <code>id</code>, <code>name</code>, etc, or <code>createdAt</code> (by created time), or <code>updatedAt</code> (by updated time)',
  })
  @IsString()
  sort: string;

  @ApiProperty({
    type: 'string',
    enum: ['asc', 'desc'],
  })
  @IsString()
  order: string;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  @Min(1)
  page: number;

  @ApiProperty({
    type: 'number',
    example: 10,
  })
  @Min(1)
  limit: number;

  offset: number;
}
