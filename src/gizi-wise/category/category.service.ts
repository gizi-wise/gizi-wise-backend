import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { QueryListCategoryDto } from './dto/query-list-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryModel.create({
        ...createCategoryDto,
      });
      return new CategoryDto(category);
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: QueryListCategoryDto) {
    try {
      const { limit, offset, name } = query;
      const whereOptions: WhereOptions = {};
      if (name) {
        whereOptions['name'] = {
          [Op.iLike]: `%${name}%`,
        };
      }
      const { rows, count } = await this.categoryModel.findAndCountAll({
        where: whereOptions,
        attributes: {
          exclude: ['createdAt', 'deletedAt', 'updatedAt'],
        },
        limit,
        offset,
        distinct: true,
      });
      return {
        categories: rows.map((category) => new CategoryDto(category)),
        count,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryModel.findByPk(id);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      return new CategoryDto(category);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const [affectedCount] = await this.categoryModel.update(
        updateCategoryDto,
        {
          where: {
            id,
          },
        },
      );
      if (affectedCount === 0) {
        throw new NotFoundException('Category not found');
      }
      return await this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deleted = await this.categoryModel.destroy({
        where: {
          id,
        },
      });
      if (deleted === 0) {
        throw new Error('Category not found');
      }
      return 'Category deleted';
    } catch (error) {
      throw error;
    }
  }
}
