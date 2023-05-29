import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends CreateUserDto {
  constructor(data: User, omit: string[] = []) {
    super();
    validateAndTransformData.call(this, data, omit);
  }
}
