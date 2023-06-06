import { Auth } from '@gizi-wise/auth/auth.decorator';
import { Role } from '@gizi-wise/admin/entities/admin.entity';
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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { ResponseListTagDto } from './dto/list-tag.dto';
import { QueryListTagDto } from './dto/query-list-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({
    description: 'Create a tag, tag is only for articles and recipes',
  })
  @Auth(Role.ADMIN)
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  @ApiOperation({
    description: 'Retrieve list of tags, tag is only for articles and recipes',
  })
  async findAll(@Query() query: QueryListTagDto): Promise<ResponseListTagDto> {
    const { page, limit } = query;
    query.offset = (page - 1) * limit;
    const { tags, count } = await this.tagsService.findAll(query);
    return new ResponseListTagDto({
      tags,
      page,
      limit,
      totalData: count,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tagsService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  update(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: number) {
    return this.tagsService.remove(id);
  }
}
