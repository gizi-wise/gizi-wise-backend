import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min } from 'class-validator';

export class QueryListCategoryDto {
  @ApiPropertyOptional({
    type: 'string',
    example: 'sayur',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  name?: string;

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
