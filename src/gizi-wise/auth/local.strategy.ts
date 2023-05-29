import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private adminAuthService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      const admin = await this.adminAuthService.validateAdmin(
        username,
        password,
      );
      if (!admin.isActive) {
        throw new ForbiddenException('Your account is not active');
      }
      return admin;
    } catch (error) {
      throw error;
    }
  }
}
