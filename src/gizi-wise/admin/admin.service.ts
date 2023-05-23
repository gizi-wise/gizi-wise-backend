import { HashService } from '@common/hash/hash.service';
import { UuidService } from '@common/uuid/uuid.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { AdminDto } from './dto/admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin, AdminRole } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private readonly adminModel: typeof Admin,
    private readonly uuidService: UuidService,
    private readonly hashService: HashService,
  ) {}

  private async checkEmailIsUsed(email: string, id?: string) {
    try {
      const where = {
        email,
      };
      if (id) {
        where['id'] = { [Op.ne]: id };
      }
      const admin = await this.adminModel.findOne({ where });
      if (admin) {
        throw new BadRequestException('Email is already used.');
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
      const admin = await this.adminModel.findOne({ where });
      if (admin) {
        throw new BadRequestException('Username is already used.');
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
        role = AdminRole.ADMIN,
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

  async findAll() {
    try {
      const { rows, count } = await this.adminModel.findAndCountAll();
      return {
        admins: rows.map((admin) => new AdminDto(admin, ['password'])),
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
        throw new NotFoundException('Admin not found.');
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
        throw new NotFoundException('Admin not found.');
      }
      return new AdminDto(admin, withPassword ? [] : ['password']);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      await this.findOne(id);
      const { username, email, password } = updateAdminDto;
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
        throw new NotFoundException('Admin not found.');
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
        throw new NotFoundException('Admin not found.');
      }
      return { affectedCount };
    } catch (error) {
      throw error;
    }
  }
}
