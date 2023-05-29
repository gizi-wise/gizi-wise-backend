import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { IsEmail, IsString } from 'class-validator';

export class ReviveAdminDto {
  @IsOptionalWithEmptyString()
  @IsEmail()
  email?: string;

  @IsOptionalWithEmptyString()
  @IsString()
  username?: string;
}
