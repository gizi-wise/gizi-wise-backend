import { Controller, UseGuards, Post, Request } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AdminAuthLoginDto } from './admin-auth.dto';
import { AdminAuthService } from './admin-auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Admins')
@Controller('admins/auth')
export class AdminAuthController {
  constructor(private authService: AdminAuthService) {}
  @ApiBody({
    description: 'Login admin',
    type: AdminAuthLoginDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
