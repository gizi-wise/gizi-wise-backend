import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminService } from '../admin.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '@common/hash/hash.service';

@Injectable()
export class AdminAuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async validateAdmin(username: string, pass: string) {
    try {
      const { password, ...result } =
        await this.adminService.findOneByEmailOrUsername(username, true);
      const isPasswordMatching = await this.hashService.compare(pass, password);
      if (!isPasswordMatching) {
        throw new BadRequestException('Wrong password');
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(admin: any) {
    const payload = {
      role: admin.role,
      username: admin.username,
      email: admin.email,
      id: admin.id,
    };
    return {
      id: admin.id,
      role: admin.role,
      access_token: this.jwtService.sign(payload),
    };
  }
}
