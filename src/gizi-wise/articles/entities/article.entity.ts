import { Admin } from '@gizi-wise/admin/entities/admin.entity';
import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ArticleTag } from './article-tag.entity';

@Table({
  tableName: 'articles',
  timestamps: true,
  paranoid: true,
})
export class Article extends Model {
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
  content: string;

  @Column
  isFeatured: boolean;

  @Column
  @ForeignKey(() => Admin)
  authorId: string;

  @BelongsTo(() => Admin)
  author: Admin;

  @HasMany(() => ArticleTag)
  articleTags: ArticleTag[];

  @Column
  createdAt?: Date;

  @Column
  updatedAt?: Date;
}
