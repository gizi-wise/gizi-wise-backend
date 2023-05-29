import { FirebaseVerifyTokenResultDto } from '@common/firebase/firebase.dto';
import { FirebaseService } from '@common/firebase/firebase.service';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Op, WhereOptions } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryListUserDto } from './dto/query-list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly errorMessages = {
    notFound: 'User not found',
    expiredJwt: 'Expired JWT token',
  };
  constructor(
    @Inject(User)
    private userModel: typeof User,
    private readonly firebaseService: FirebaseService,
  ) {}

  async findOrCreate(createUserDto: CreateUserDto) {
    const { id, ...payloadCreateUser } = createUserDto;
    try {
      const [user] = await this.userModel.findOrCreate({
        where: {
          id,
        },
        defaults: { ...payloadCreateUser },
      });
      return new UserDto(user);
    } catch (error) {
      throw error;
    }
  }

  async findAll(queryListUserDto: QueryListUserDto) {
    const { limit, offset, order, sort, email, name } = queryListUserDto;
    try {
      const where: WhereOptions = {};
      if (email) {
        where.email = email;
      }
      if (name) {
        where.name = [Op.like, `%${name}%`];
      }
      const { rows, count } = await this.userModel.findAndCountAll({
        where,
        attributes: {
          exclude: ['createdAt', 'deletedAt', 'updatedAt'],
        },
        limit,
        offset,
        order: [[sort, order]],
      });
      return {
        users: rows.map((row) => new UserDto(row)),
        count,
      };
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    return this.userModel.findByPk(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const [affectedCount] = await this.userModel.update(updateUserDto, {
        where: {
          id,
        },
      });
      if (affectedCount === 0) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const affectedCount = await this.userModel.destroy({
        where: {
          id,
        },
      });
      if (affectedCount === 0) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return 'User deleted';
    } catch (error) {
      throw error;
    }
  }

  async verifyIdToken(idToken: string) {
    try {
      const decodedToken = (await this.firebaseService.verifyIdToken(
        idToken,
      )) as FirebaseVerifyTokenResultDto;
      const currentTime = new Date().getTime() / 1000;
      if (!decodedToken.iat || decodedToken.iat < currentTime) {
        throw new UnauthorizedException(this.errorMessages.expiredJwt);
      }
    } catch (error) {
      throw error;
    }
  }
}
