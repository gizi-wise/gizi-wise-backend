import { Product } from '@gizi-wise/product/entities/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTkpiDto } from './dto/create-tkpi.dto';
import { QueryListTkpiDto } from './dto/query-list-tkpi.dto';
import { TkpiDto } from './dto/tkpi.dto';
import { UpdateTkpiDto } from './dto/update-tkpi.dto';
import { Tkpi } from './entities/tkpi.entity';

@Injectable()
export class TkpiService {
  private readonly errorMessages = {
    notFound: 'TKPI not found',
  };
  constructor(
    @InjectModel(Tkpi)
    private tkpiModel: typeof Tkpi,
  ) {}
  async create(createTkpiDto: CreateTkpiDto) {
    try {
      const tkpi = await this.tkpiModel.create({
        ...createTkpiDto,
      });
      return new TkpiDto(tkpi);
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: QueryListTkpiDto) {
    try {
      const { limit, offset, productId, sort, order } = query;
      const whereOptions: any = {};
      if (productId) {
        whereOptions['productId'] = productId;
      }
      const { rows, count } = await this.tkpiModel.findAndCountAll({
        where: whereOptions,
        attributes: {
          exclude: ['createdAt', 'deletedAt', 'updatedAt'],
        },
        include: [
          {
            model: Product,
            attributes: ['id', 'name'],
          },
        ],
        limit,
        offset,
        order: [[sort, order]],
      });
      return {
        tkpis: rows.map((row) => new TkpiDto(row)),
        count,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const tkpi = await this.tkpiModel.findByPk(id, {
        include: [
          {
            model: Product,
            attributes: ['id', 'name'],
          },
        ],
      });
      if (!tkpi) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return new TkpiDto(tkpi);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateTkpiDto: UpdateTkpiDto) {
    try {
      const [affectedCount] = await this.tkpiModel.update(updateTkpiDto, {
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
      const deleted = await this.tkpiModel.destroy({
        where: {
          id,
        },
      });
      if (deleted === 0) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return 'TKPI deleted';
    } catch (error) {
      throw error;
    }
  }
}
