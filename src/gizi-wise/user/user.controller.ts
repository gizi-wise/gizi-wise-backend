import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryListUserDto } from './dto/query-list-user.dto';
import { ResponseListUserDto } from './dto/list-user.dto';
import { Role } from '@gizi-wise/admin/entities/admin.entity';
import { Auth } from '@gizi-wise/auth/auth.decorator';
import { LoggedUser } from '@common/decorators/logged-user.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  errorMessages = {
    forbidSee: 'You are not allowed to see other user info',
    forbidModify: 'You are not allowed to modify other user',
    forbidDelete: 'You are not allowed to delete other user',
  };
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth(Role.ADMIN)
  async findAll(@Query() query: QueryListUserDto) {
    const { page, limit } = query;
    query.offset = (page - 1) * limit;
    const { users, count } = await this.userService.findAll(query);
    return new ResponseListUserDto({
      users,
      page,
      limit,
      totalData: count,
    });
  }

  @Get(':id')
  @Auth(Role.USER)
  findOne(@LoggedUser() user: any, @Param('id') id: string) {
    if (user.role === Role.USER && user.id !== id) {
      throw new ForbiddenException(this.errorMessages.forbidSee);
    }
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.USER)
  update(
    @LoggedUser() user: any,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (user.role === Role.USER && user.id !== id) {
      throw new ForbiddenException(this.errorMessages.forbidModify);
    }
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Auth(Role.USER)
  remove(@LoggedUser() user: any, @Param('id') id: string) {
    if (user.role === Role.USER && user.id !== id) {
      throw new ForbiddenException(this.errorMessages.forbidDelete);
    }
    return this.userService.remove(id);
  }
}
