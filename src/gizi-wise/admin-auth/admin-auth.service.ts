import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '@common/utilities/hash/hash.service';

@Injectable()
export class AdminAuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async validateAdmin(username: string, pass: string) {
    try {
      const { password, ...result } = await this.adminService
        .findOneByEmailOrUsername(username, true)
        .catch(() => {
          throw new BadRequestException('Credential is not valid');
        });
      const isPasswordMatching = await this.hashService.compare(pass, password);
      if (!isPasswordMatching) {
        throw new BadRequestException('Credential is not valid');
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(admin: any) {
    return {
      id: admin.id,
      role: admin.role,
      access_token: this.jwtService.sign(admin),
    };
  }
}
