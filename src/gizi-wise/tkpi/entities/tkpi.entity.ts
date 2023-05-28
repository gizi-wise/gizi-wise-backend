import { Product } from '@gizi-wise/product/entities/product.entity';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'tkpis',
  paranoid: true,
})
export class Tkpi extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column
  name: string;

  @Column
  symbol: string;

  @Column
  value: number;

  @Column
  unit: string;
}
