import { AdminRole } from '@gizi-wise/admin/entities/admin.entity';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles) =>
  SetMetadata(ROLES_KEY, [AdminRole.SUPER_ADMIN, ...roles]);
