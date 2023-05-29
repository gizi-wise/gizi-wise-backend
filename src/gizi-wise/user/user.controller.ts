import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { QueryListUserDto } from './dto/query-list-user.dto';
import { ResponseListUserDto } from './dto/list-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
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
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('firebase-sign-in')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        idToken: {
          type: 'string',
        },
      },
    },
  })
  verifyIdToken(@Body('idToken') idToken: string) {
    return this.userService.verifyIdToken(idToken);
  }
}
