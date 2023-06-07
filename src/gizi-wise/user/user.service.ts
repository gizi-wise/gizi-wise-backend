import { CloudStorageService } from '@common/cloud-storage/cloud-storage.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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
  };
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly cloudStorageService: CloudStorageService,
  ) {}

  async findOrCreate(createUserDto: CreateUserDto) {
    const { id, ...payloadCreateUser } = createUserDto;
    try {
      payloadCreateUser.role = 'user';
      const [user, isNewAccount] = await this.userModel.findOrCreate({
        where: {
          id,
        },
        defaults: { ...payloadCreateUser },
      });
      return {
        user: new UserDto(user),
        isNewAccount,
      };
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

  async findOne(id: string) {
    try {
      const user = await this.userModel.findByPk(id);
      if (!user) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return new UserDto(user);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { image } = updateUserDto;
      const user = await this.findOne(id);
      const [affectedCount] = await this.userModel.update(updateUserDto, {
        where: {
          id,
        },
      });
      if (affectedCount === 0) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      if (user.image && image && user.image !== image) {
        await this.cloudStorageService.deleteFile(user.image);
      }
      return this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findOne(id);
      const affectedCount = await this.userModel.destroy({
        where: {
          id,
        },
        force: true,
      });
      if (affectedCount === 0) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      if (user.image) {
        await this.cloudStorageService.deleteFile(user.image);
      }
      return 'User deleted';
    } catch (error) {
      throw error;
    }
  }
}
