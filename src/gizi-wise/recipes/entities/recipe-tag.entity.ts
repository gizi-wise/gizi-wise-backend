import { Tag } from '@gizi-wise/tags/entities/tag.entity';
import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Recipe } from './recipe.entity';

@Table({
  tableName: 'recipe_tags',
  timestamps: true,
  paranoid: true,
})
export class RecipeTag extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Recipe)
  @Column
  recipeId: number;

  @BelongsTo(() => Recipe)
  recipe: Recipe;

  @ForeignKey(() => Tag)
  @Column
  tagId?: number;

  @BelongsTo(() => Tag)
  tag: Tag;
}
