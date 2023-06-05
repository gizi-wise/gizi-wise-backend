import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ForbiddenException,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { QueryListUserDto } from './dto/query-list-user.dto';
import { ResponseListUserDto } from './dto/list-user.dto';
import { Role } from '@gizi-wise/admin/entities/admin.entity';
import { Auth } from '@gizi-wise/auth/auth.decorator';
import { LoggedUser } from '@common/decorators/logged-user.decorator';
import { UploadImageUserDto } from './dto/upload-image-user.dto';
import { RawBody } from '@common/decorators/raw-body.decorator';
import { validateMultipartFormFile } from '@common/functions/validate-multipart-form-file';
import { CloudStorageService } from '@common/cloud-storage/cloud-storage.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  errorMessages = {
    forbidSee: 'You are not allowed to see other user info',
    forbidModify: 'You are not allowed to modify other user',
    forbidDelete: 'You are not allowed to delete other user',
  };
  constructor(
    private readonly userService: UserService,
    private readonly cloudStorageService: CloudStorageService,
  ) {}
  @Post('/upload-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload image',
    type: UploadImageUserDto,
  })
  @Auth(Role.USER)
  async uploadImage(
    @LoggedUser() user: any,
    @RawBody()
    body: UploadImageUserDto,
  ) {
    const result = {
      field: '',
      url: '',
    };
    const { image } = body;
    validateMultipartFormFile(image, {
      allowedExtension: 'image',
      allowedMimeType: 'image',
    });
    if (image.file) {
      if (image.mime_type.split('/')[0] === 'image') {
        const url = await this.cloudStorageService.uploadFile({
          destination: `images/users/${Date.now()}-${image.file.name}`,
          contentType: image.mime_type,
          file: image.file.buffer,
          moduleName: 'users',
          uploader: {
            id: user.id,
            role: user.role,
          },
        });
        result.field = image.name;
        result.url = url;
      }
    }
    return result;
  }

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
