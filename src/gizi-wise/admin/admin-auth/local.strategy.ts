import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private adminAuthService: AdminAuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      const admin = await this.adminAuthService.validateAdmin(
        username,
        password,
      );
      if (!admin.isActive) {
        throw new UnauthorizedException('Your account is not active');
      }
      return admin;
    } catch (error) {
      throw error;
    }
  }
}
