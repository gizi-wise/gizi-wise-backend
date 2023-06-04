import { IS_PUBLIC_KEY } from '@common/decorators/public.decorator';
import { ROLES_KEY } from '@common/decorators/roles.decorator';
import { AdminService } from '@gizi-wise/admin/admin.service';
import { Role } from '@gizi-wise/admin/entities/admin.entity';
import { UserService } from '@gizi-wise/user/user.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const { headers } = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic && !headers.authorization) {
      return true;
    }
    await super.canActivate(context);
    const { user } = context.switchToHttp().getRequest();
    const requiredRoles = new Set(
      this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]),
    );
    if (requiredRoles.has(Role.USER)) {
      requiredRoles.add(Role.ADMIN);
    }
    if (user.role === 'user') {
      const userVerified = await this.userService.findOne(user.id);
      context.switchToHttp().getRequest().user = userVerified;
    } else {
      const adminVerified = await this.adminService.findOne(user.id, false);
      context.switchToHttp().getRequest().user = adminVerified;
    }
    return requiredRoles.has(user.role);
  }
}
