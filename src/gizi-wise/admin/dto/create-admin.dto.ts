import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { IsPasswordStrong } from '@common/validators/is-password-strong.validator';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPasswordStrong()
  password: string;

  @IsOptionalWithEmptyString()
  @IsString()
  image?: string;

  @IsOptionalWithEmptyString()
  @IsString()
  role: string;

  @IsOptionalWithEmptyString()
  @IsBoolean()
  isActive: boolean;
}
