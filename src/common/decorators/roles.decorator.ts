import { Role } from '@gizi-wise/admin/entities/admin.entity';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles) =>
  SetMetadata(ROLES_KEY, [Role.SUPER_ADMIN, ...roles]);
