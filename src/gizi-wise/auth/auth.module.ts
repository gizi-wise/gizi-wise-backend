import { Module, forwardRef, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '@gizi-wise/user/user.module';
import { AuthAdminController } from './auth-admin.controller';
import { AdminModule } from '@gizi-wise/admin/admin.module';
import { AuthService } from './auth.service';
import { AuthUserController } from './auth-user.controller';

@Global()
@Module({
  imports: [
    forwardRef(() => AdminModule),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRATION_TIME'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthAdminController, AuthUserController],
  exports: [AdminModule, UserModule],
})
export class AuthModule {}
