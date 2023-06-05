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
import { Article } from './article.entity';

@Table({
  tableName: 'article_tags',
  timestamps: true,
  paranoid: true,
})
export class ArticleTag extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Article)
  @Column
  articleId: number;

  @BelongsTo(() => Article)
  article: Article;

  @ForeignKey(() => Tag)
  @Column
  tagId?: number;

  @BelongsTo(() => Tag)
  tag: Tag;
}
