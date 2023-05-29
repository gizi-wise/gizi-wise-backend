import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from '@gizi-wise/admin/entities/admin.entity';
import { UserDto } from '@gizi-wise/user/dto/user.dto';
import { AdminDto } from '@gizi-wise/admin/dto/admin.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return payload.role === Role.USER
      ? new UserDto(payload)
      : new AdminDto(payload);
  }
}
