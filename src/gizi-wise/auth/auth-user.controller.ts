import { Role } from '@gizi-wise/admin/entities/admin.entity';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Auth } from './auth.decorator';
import { UserAuthLoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('User Authentication')
@Controller('users/auth')
export class AuthUserController {
  constructor(private authService: AuthService) {}

  @Post('firebase')
  @ApiBody({
    description: 'Sign in using firebase',
    type: UserAuthLoginDto,
  })
  async verifyIdToken(@Body() body: UserAuthLoginDto) {
    return this.authService.verifyIdToken(body.idToken);
  }

  @Get('profile')
  @Auth(Role.USER)
  getProfile(@Request() req: any) {
    return req.user;
  }
}
