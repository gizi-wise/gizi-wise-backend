import { CloudStorageService } from '@common/cloud-storage/cloud-storage.service';
import { HashService } from '@common/utilities/hash/hash.service';
import { UuidService } from '@common/utilities/uuid/uuid.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { AdminDto } from './dto/admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { QueryListAdminDto } from './dto/query-list-admin.dto';
import { ReviveAdminDto } from './dto/revive-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin, Role } from './entities/admin.entity';

@Injectable()
export class AdminService {
  private readonly errorMessages = {
    notFound: 'Admin not found',
    emailUsed: 'Email is already used',
    usernameUsed: 'Username is already used',
  };
  constructor(
    @InjectModel(Admin)
    private readonly adminModel: typeof Admin,
    private readonly uuidService: UuidService,
    private readonly hashService: HashService,
    private readonly cloudStorageService: CloudStorageService,
  ) {}

  private async checkEmailIsUsed(email: string, id?: string) {
    try {
      const where = {
        email,
      };
      if (id) {
        where['id'] = { [Op.ne]: id };
      }
      const admin = await this.adminModel.findOne({ where, paranoid: false });
      if (admin) {
        throw new BadRequestException(this.errorMessages.emailUsed);
      }
    } catch (error) {
      throw error;
    }
  }

  private async checkUsernameIsUsed(username: string, id?: string) {
    try {
      const where = {
        username,
      };
      if (id) {
        where['id'] = { [Op.ne]: id };
      }
      const admin = await this.adminModel.findOne({ where, paranoid: false });
      if (admin) {
        throw new BadRequestException(this.errorMessages.usernameUsed);
      }
    } catch (error) {
      throw error;
    }
  }

  async create(createAdminDto: CreateAdminDto): Promise<AdminDto> {
    try {
      const {
        username,
        email,
        password,
        role = Role.ADMIN,
        isActive = false,
        ...props
      } = createAdminDto;

      await this.checkEmailIsUsed(email);
      await this.checkUsernameIsUsed(username);

      const hashedPassword = await this.hashService.hash(password);

      const admin = await this.adminModel.create({
        id: this.uuidService.genUUIDV4(),
        username,
        email,
        password: hashedPassword,
        role,
        isActive,
        ...props,
      });
      return new AdminDto(admin, ['password']);
    } catch (error) {
      throw error;
    }
  }

  async findAll(queryListAdminDto: QueryListAdminDto) {
    try {
      const { limit, offset, isActive, name, role, order, sort } =
        queryListAdminDto;
      const whereOptions: WhereOptions = {};
      if (typeof isActive === 'boolean') {
        whereOptions['isActive'] = isActive;
      }
      if (name) {
        whereOptions['name'] = {
          [Op.iLike]: `%${name}%`,
        };
      }
      if (role) {
        whereOptions['role'] = role;
      }
      const { rows, count } = await this.adminModel.findAndCountAll({
        where: whereOptions,
        attributes: {
          exclude: ['createdAt', 'deletedAt', 'updatedAt', 'password'],
        },
        limit,
        offset,
        order: [[sort, order]],
        distinct: true,
      });
      return {
        admins: rows.map((admin) => new AdminDto(admin)),
        count,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string, withPassword = false) {
    try {
      const admin = await this.adminModel.findOne({ where: { id } });
      if (!admin) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return new AdminDto(admin, withPassword ? [] : ['password']);
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmailOrUsername(keyword: string, withPassword = false) {
    try {
      const admin = await this.adminModel.findOne({
        where: {
          [Op.or]: [{ email: keyword }, { username: keyword }],
        },
      });
      if (!admin) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return new AdminDto(admin, withPassword ? [] : ['password']);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      const user = await this.findOne(id);
      const { username, email, password, image } = updateAdminDto;
      if (email) {
        await this.checkEmailIsUsed(email, id);
      }
      if (username) {
        await this.checkUsernameIsUsed(username, id);
      }
      if (password) {
        updateAdminDto.password = await this.hashService.hash(password);
      }
      const [affectedCount] = await this.adminModel.update(
        { ...updateAdminDto },
        {
          where: { id },
        },
      );
      if (affectedCount === 0) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      if (user.image && user.image !== image) {
        await this.cloudStorageService.deleteFile(user.image);
      }
      const admin = await this.findOne(id);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      const affectedCount = await this.adminModel.destroy({ where: { id } });
      if (affectedCount === 0) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return { affectedCount };
    } catch (error) {
      throw error;
    }
  }

  async revive(reviveAdminDto: ReviveAdminDto) {
    const { username, email } = reviveAdminDto;
    try {
      if (!username && !email) {
        throw new BadRequestException('Atleast username or email is provided');
      }
      await this.adminModel.restore({
        where: {
          [Op.or]: [{ email: email ?? null }, { username: username ?? null }],
        },
      });
      return this.findOneByEmailOrUsername(username ?? email);
    } catch (error) {
      throw error;
    }
  }
}
