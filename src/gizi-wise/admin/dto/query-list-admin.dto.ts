import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsString, Min } from 'class-validator';
import { AdminRole } from '../entities/admin.entity';

export class QueryListAdminDto {
  @ApiPropertyOptional({
    type: 'string',
    example: 'admin',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    type: 'string',
    enum: ['admin', 'superadmin'],
  })
  @IsOptionalWithEmptyString()
  @IsEnum(AdminRole)
  role?: AdminRole;

  @ApiPropertyOptional({
    type: 'boolean',
    example: true,
  })
  @IsOptionalWithEmptyString()
  @IsBoolean()
  isActive?: boolean;

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
