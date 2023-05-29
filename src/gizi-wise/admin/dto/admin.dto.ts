import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { IsNotEmpty, IsString, IsBoolean, IsEnum } from 'class-validator';
import { Admin, Role } from '../entities/admin.entity';
import { CreateAdminDto } from './create-admin.dto';

export class AdminDto extends CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptionalWithEmptyString()
  @IsString()
  password?: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  constructor(data: Admin, omit: string[] = []) {
    super();
    validateAndTransformData.call(this, data, omit);
  }
}
