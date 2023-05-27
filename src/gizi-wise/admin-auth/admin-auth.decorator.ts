import { Roles } from '@common/decorators/roles.decorator';
import { AdminRole } from '@gizi-wise/admin/entities/admin.entity';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AdminJwtAuthGuard } from './jwt-auth.guard';

export function AdminAuth(...roles: AdminRole[]) {
  return applyDecorators(
    UseGuards(AdminJwtAuthGuard),
    Roles(...roles),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
