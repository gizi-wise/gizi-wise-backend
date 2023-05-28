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
import { TkpiService } from './tkpi.service';
import { CreateTkpiDto } from './dto/create-tkpi.dto';
import { UpdateTkpiDto } from './dto/update-tkpi.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryListTkpiDto } from './dto/query-list-tkpi.dto';
import { AdminAuth } from '@gizi-wise/admin-auth/admin-auth.decorator';
import { AdminRole } from '@gizi-wise/admin/entities/admin.entity';
import { ResponseListTkpiDto } from './dto/list-tkpi.dto';

@ApiTags('TKPI')
@Controller('tkpis')
export class TkpiController {
  constructor(private readonly tkpiService: TkpiService) {}

  @Post()
  @AdminAuth(AdminRole.ADMIN)
  create(@Body() createTkpiDto: CreateTkpiDto) {
    return this.tkpiService.create(createTkpiDto);
  }

  @Get()
  async findAll(@Query() query: QueryListTkpiDto) {
    const { page, limit } = query;
    query.offset = (page - 1) * limit;
    const { tkpis, count } = await this.tkpiService.findAll(query);
    return new ResponseListTkpiDto({
      tkpis,
      page,
      limit,
      totalData: count,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tkpiService.findOne(id);
  }

  @Patch(':id')
  @AdminAuth(AdminRole.ADMIN)
  update(@Param('id') id: number, @Body() updateTkpiDto: UpdateTkpiDto) {
    return this.tkpiService.update(id, updateTkpiDto);
  }

  @Delete(':id')
  @AdminAuth(AdminRole.ADMIN)
  remove(@Param('id') id: number) {
    return this.tkpiService.remove(id);
  }
}
