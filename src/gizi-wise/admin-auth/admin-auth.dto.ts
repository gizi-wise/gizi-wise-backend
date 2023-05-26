import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminAuthLoginDto {
  @ApiProperty({
    type: 'string',
    example: 'email or username',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    type: 'string',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
