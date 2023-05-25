import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min } from 'class-validator';

export class QueryListAdminDto {
  @ApiPropertyOptional({
    type: 'string',
    example: 'admin',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: 'string',
    example: 'ADMIN',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  role: string;

  @ApiPropertyOptional({
    type: 'boolean',
    example: true,
  })
  @IsOptionalWithEmptyString()
  isActive: boolean;

  @ApiPropertyOptional({
    type: 'number',
    example: 1,
  })
  @Min(1)
  page: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 10,
  })
  @Min(1)
  limit: number;

  offset: number;
}
