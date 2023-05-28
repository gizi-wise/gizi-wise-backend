import { Category } from '@gizi-wise/category/entities/category.entity';
import { Tkpi } from '@gizi-wise/tkpi/entities/tkpi.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { QueryListProductDto } from './dto/query-list-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private readonly errorMessages = {
    notFound: 'Product not found',
  };
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const category = await this.productModel.create({
        ...createProductDto,
      });
      return new ProductDto(category);
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: QueryListProductDto) {
    try {
      const { limit, offset, name, type, categoryId, order, sort } = query;
      const whereOptions: WhereOptions = {};
      if (name) {
        whereOptions['name'] = {
          [Op.iLike]: `%${name}%`,
        };
      }
      if (type) {
        whereOptions['type'] = type;
      }
      if (categoryId) {
        whereOptions['categoryId'] = categoryId;
      }

      const { rows, count } = await this.productModel.findAndCountAll({
        include: [
          {
            model: Category,
            attributes: ['id', 'name'],
          },
        ],
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
        products: rows.map((product) => new ProductDto(product)),
        count,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productModel.findByPk(id, {
        include: [
          {
            model: Category,
            attributes: {
              exclude: ['createdAt', 'deletedAt', 'updatedAt'],
            },
          },
          {
            model: Tkpi,
            attributes: {
              exclude: ['productId', 'createdAt', 'deletedAt', 'updatedAt'],
            },
          },
        ],
      });
      if (!product) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return new ProductDto(product);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const [affectedCount] = await this.productModel.update(updateProductDto, {
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
      const deleted = await this.productModel.destroy({
        where: {
          id,
        },
      });
      if (deleted === 0) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return 'Product deleted';
    } catch (error) {
      throw error;
    }
  }
}
