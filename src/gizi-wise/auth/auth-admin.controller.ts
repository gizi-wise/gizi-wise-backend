import { Role } from '@gizi-wise/admin/entities/admin.entity';
import { Controller, UseGuards, Post, Get, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { Auth } from './auth.decorator';
import { AdminAuthLoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Admin Authentication')
@Controller('admins/auth')
export class AuthAdminController {
  constructor(private authService: AuthService) {}

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
  @Auth(Role.ADMIN)
  getProfile(@Request() req: any) {
    return req.user;
  }
}
