import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class QueryListDto {
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
