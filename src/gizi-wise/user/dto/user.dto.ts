import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  role: string;
  constructor(data: User, omit: string[] = []) {
    super();
    validateAndTransformData.call(this, data, omit);
  }
}
