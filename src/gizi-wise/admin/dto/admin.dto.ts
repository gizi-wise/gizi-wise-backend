import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { Admin, AdminRole } from '../entities/admin.entity';

export class AdminDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptionalWithEmptyString()
  @IsString()
  password?: string;

  @IsOptionalWithEmptyString()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsEnum(AdminRole)
  role: AdminRole;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  constructor(data: Admin, omit: string[] = []) {
    validateAndTransformData.call(this, data, omit);
  }
}
