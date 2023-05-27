import { QueryListDto } from '@common/dto/query-list.dto';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { AdminRole } from '../entities/admin.entity';

export class QueryListAdminDto extends QueryListDto {
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
}
