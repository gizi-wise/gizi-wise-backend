import { CloudStorageService } from '@common/cloud-storage/cloud-storage.service';
import { LoggedUser } from '@common/decorators/logged-user.decorator';
import { RawBody } from '@common/decorators/raw-body.decorator';
import { validateMultipartFormFile } from '@common/functions/validate-multipart-form-file';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ResponseListAdminDto } from './dto/list-admin.dto';
import { QueryListAdminDto } from './dto/query-list-admin.dto';
import { ReviveAdminDto } from './dto/revive-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UploadImageAdminDto } from './dto/upload-image-user.dto';
import { Role } from './entities/admin.entity';

@ApiTags('Admins')
@Controller('admins')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly cloudStorageService: CloudStorageService,
  ) {}

  @Post('/upload-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload image',
    type: UploadImageAdminDto,
  })
  @Auth(Role.ADMIN)
  async uploadImage(
    @LoggedUser() user: any,
    @RawBody()
    body: UploadImageAdminDto,
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
          destination: `images/admins/${Date.now()}-${image.file.name}`,
          contentType: image.mime_type,
          file: image.file.buffer,
          moduleName: 'admins',
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

  @Post()
  @Auth()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  async findAll(
    @Query() queryListAdminDto: QueryListAdminDto,
  ): Promise<ResponseListAdminDto> {
    const { page, limit } = queryListAdminDto;
    queryListAdminDto.offset = (page - 1) * limit;
    const { admins, count } = await this.adminService.findAll(
      queryListAdminDto,
    );
    return new ResponseListAdminDto({
      admins,
      page,
      limit,
      totalData: count,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @ApiBody({
    description: 'Update admin data, only filled field will be updated',
    type: CreateAdminDto,
  })
  @Patch(':id')
  @Auth(Role.ADMIN)
  update(
    @LoggedUser() user: AdminDto,
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    if (user.id !== id && user.role !== Role.SUPER_ADMIN) {
      throw new ForbiddenException();
    }
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }

  @Post('revive')
  @Auth()
  @ApiBody({
    description: 'Revive admin, atleast username or email is provided',
    type: ReviveAdminDto,
  })
  revive(@Body() reviveAdminDto: ReviveAdminDto) {
    return this.adminService.revive(reviveAdminDto);
  }
}
