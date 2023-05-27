import { AdminAuth } from '@gizi-wise/admin-auth/admin-auth.decorator';
import { AdminRole } from '@gizi-wise/admin/entities/admin.entity';
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
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @AdminAuth(AdminRole.ADMIN)
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
  @AdminAuth(AdminRole.ADMIN)
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @AdminAuth(AdminRole.ADMIN)
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
