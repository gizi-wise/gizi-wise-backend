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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryListTkpiDto } from './dto/query-list-tkpi.dto';
import { Auth } from '@gizi-wise/auth/auth.decorator';
import { Role } from '@gizi-wise/admin/entities/admin.entity';
import { ResponseListTkpiDto } from './dto/list-tkpi.dto';

@ApiTags('TKPI')
@Controller('tkpis')
export class TkpiController {
  constructor(private readonly tkpiService: TkpiService) {}

  @Post()
  @ApiOperation({
    description: 'Create a TKPI, TKPI is Tabel Komposisi Pangan Indonesia',
  })
  @Auth(Role.ADMIN)
  create(@Body() createTkpiDto: CreateTkpiDto) {
    return this.tkpiService.create(createTkpiDto);
  }

  @Get()
  @ApiOperation({
    description:
      'Retrieve list of TKPIs, TKPI is Tabel Komposisi Pangan Indonesia',
  })
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
  @Auth(Role.ADMIN)
  update(@Param('id') id: number, @Body() updateTkpiDto: UpdateTkpiDto) {
    return this.tkpiService.update(id, updateTkpiDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: number) {
    return this.tkpiService.remove(id);
  }
}
