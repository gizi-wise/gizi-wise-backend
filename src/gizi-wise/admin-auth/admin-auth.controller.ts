import { AdminRole } from '@gizi-wise/admin/entities/admin.entity';
import { Controller, UseGuards, Post, Get, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { AdminAuth } from './admin-auth.decorator';
import { AdminAuthLoginDto } from './admin-auth.dto';
import { AdminAuthService } from './admin-auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Admin Authentication')
@Controller('admins/auth')
export class AdminAuthController {
  constructor(private authService: AdminAuthService) {}

  @Post('login')
  @ApiBody({
    description: 'Login admin, you can use username or email',
    type: AdminAuthLoginDto,
  })
  @UseGuards(LocalAuthGuard)
  @ApiBadRequestResponse({ description: 'Credential is not valid' })
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @AdminAuth(AdminRole.ADMIN)
  getProfile(@Request() req: any) {
    return req.user;
  }
}
