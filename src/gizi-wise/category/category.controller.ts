import { AdminAuth } from '@gizi-wise/admin/admin-auth/admin-auth.decorator';
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
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ResponseListCategoryDto } from './dto/list-category.dto';
import { QueryListCategoryDto } from './dto/query-list-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @AdminAuth()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(
    @Query() query: QueryListCategoryDto,
  ): Promise<ResponseListCategoryDto> {
    const { page, limit } = query;
    query.offset = (page - 1) * limit;
    const { categories, count } = await this.categoryService.findAll(query);
    return new ResponseListCategoryDto({
      categories,
      page,
      limit,
      totalData: count,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @AdminAuth()
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @AdminAuth()
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
