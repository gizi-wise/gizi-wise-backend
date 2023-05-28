import { Category } from '@gizi-wise/category/entities/category.entity';
import { Tkpi } from '@gizi-wise/tkpi/entities/tkpi.entity';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'products',
  paranoid: true,
})
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @Column
  code: string;

  @Column
  name: string;

  @Column
  latinName: string;

  @Column
  origin: string;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @Column(DataType.ENUM('raw', 'processed'))
  type: ProductType;

  @Column
  description: string;

  @Column
  image: string;

  @Column
  servingSize: number;

  @Column
  servingUnit: string;

  @Column
  ediblePortion: number;

  @HasMany(() => Tkpi)
  tkpis: Tkpi[];
}

export enum ProductType {
  RAW = 'raw',
  PROCESSED = 'processed',
}
