import { IS_PUBLIC_KEY } from '@common/decorators/public.decorator';
import { ROLES_KEY } from '@common/decorators/roles.decorator';
import { AdminService } from '@gizi-wise/admin/admin.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminJwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private reflector: Reflector,
    private adminService: AdminService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    await super.canActivate(context);
    const { user } = context.switchToHttp().getRequest();
    await this.adminService.findOne(user.id, false);
    const requiredRoles = new Set(
      this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]),
    );
    if (requiredRoles.size === 0) {
      return true;
    }
    return requiredRoles.has(user.role);
  }
}
