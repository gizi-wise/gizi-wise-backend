import { Controller, Get, Param, Query } from '@nestjs/common';
import { FileUploadLogsService } from './file-upload-logs.service';
import { ApiTags } from '@nestjs/swagger';
import { QueryListFileUploadLogDto } from './dto/query-list-file-upload-log.dto';
import { ResponseListFileUploadLogDto } from './dto/list-file-upload-log.dto';
import { Auth } from '@gizi-wise/auth/auth.decorator';
import { Role } from '@gizi-wise/admin/entities/admin.entity';

@ApiTags('File Upload Logs')
@Auth(Role.ADMIN)
@Controller('file-upload-logs')
export class FileUploadLogsController {
  constructor(private readonly fileUploadLogsService: FileUploadLogsService) {}

  @Get()
  async findAll(
    @Query() query: QueryListFileUploadLogDto,
  ): Promise<ResponseListFileUploadLogDto> {
    const { page, limit } = query;
    query.offset = (page - 1) * limit;
    const { categories, count } = await this.fileUploadLogsService.findAll(
      query,
    );
    return new ResponseListFileUploadLogDto({
      categories,
      page,
      limit,
      totalData: count,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fileUploadLogsService.findOne(id);
  }
}
