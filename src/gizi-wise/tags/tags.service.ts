import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { TagDto } from './dto/tag.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { QueryListTagDto } from './dto/query-list-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  private readonly errorMessages = {
    notFound: 'Tag not found',
  };
  constructor(
    @InjectModel(Tag)
    private readonly tagModel: typeof Tag,
  ) {}
  async create(createTagDto: CreateTagDto) {
    try {
      const tag = await this.tagModel.create({
        ...createTagDto,
      });
      return new TagDto(tag);
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: QueryListTagDto) {
    try {
      const { limit, offset, name, order, sort } = query;
      const whereOptions: WhereOptions = {};
      if (name) {
        whereOptions['name'] = {
          [Op.iLike]: `%${name}%`,
        };
      }
      const { rows, count } = await this.tagModel.findAndCountAll({
        where: whereOptions,
        attributes: {
          exclude: ['createdAt', 'deletedAt', 'updatedAt'],
        },
        limit,
        offset,
        order: [[sort, order]],
        distinct: true,
      });
      return {
        categories: rows.map((tag) => new TagDto(tag)),
        count,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const tag = await this.tagModel.findByPk(id);
      if (!tag) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return new TagDto(tag);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    try {
      const [affectedCount] = await this.tagModel.update(updateTagDto, {
        where: {
          id,
        },
      });
      if (affectedCount === 0) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return await this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deleted = await this.tagModel.destroy({
        where: {
          id,
        },
      });
      if (deleted === 0) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return 'Tag deleted';
    } catch (error) {
      throw error;
    }
  }
}
