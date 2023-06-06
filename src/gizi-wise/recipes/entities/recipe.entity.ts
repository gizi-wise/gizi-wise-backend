import { Admin } from '@gizi-wise/admin/entities/admin.entity';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { RecipeTag } from './recipe-tag.entity';

@Table({
  tableName: 'recipes',
  timestamps: true,
  paranoid: true,
})
export class Recipe extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  title: string;

  @Column
  summary?: string;

  @Column
  image?: string;

  @Column
  isFeatured: boolean;

  @Column
  ingredients: string;

  @Column
  instructions: string;

  @Column
  tips: string;

  @Column
  @ForeignKey(() => Admin)
  authorId: string;

  @BelongsTo(() => Admin)
  author: Admin;

  @HasMany(() => RecipeTag)
  recipeTags: RecipeTag[];

  @Column
  createdAt?: Date;

  @Column
  updatedAt?: Date;
}
