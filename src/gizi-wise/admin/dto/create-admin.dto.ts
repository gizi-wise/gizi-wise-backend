import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { IsPasswordStrong } from '@common/validators/is-password-strong.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    type: 'string',
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    type: 'string',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'admin@giziwise.my.id',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'Admin123',
  })
  @IsNotEmpty()
  @IsString()
  @IsPasswordStrong()
  password: string;

  @ApiPropertyOptional({
    type: 'string',
    example: 'https://www.example.com/image.jpg',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    enum: ['admin', 'superadmin'],
  })
  @IsOptionalWithEmptyString()
  @IsString()
  role: string;

  @ApiPropertyOptional()
  @IsOptionalWithEmptyString()
  @IsBoolean()
  isActive: boolean;
}
