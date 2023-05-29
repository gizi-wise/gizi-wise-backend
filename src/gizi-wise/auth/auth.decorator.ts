import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@gizi-wise/admin/entities/admin.entity';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    Roles(...roles),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
