import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { InternalServerErrorException } from '@nestjs/common';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsBoolean,
  validateSync,
} from 'class-validator';
import { Admin } from '../entities/admin.entity';

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
  password: string;

  @IsOptionalWithEmptyString()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  constructor(data: Admin, omit: string[] = []) {
    Object.assign(this, data instanceof Admin ? data.toJSON() : data);
    const errors = validateSync(this, {
      validationError: { target: true },
      whitelist: true,
    });
    if (errors.length > 0) {
      throw new InternalServerErrorException(errors);
    }
    if (omit.length) {
      omit.forEach((key) => delete this[key]);
    }
  }
}
