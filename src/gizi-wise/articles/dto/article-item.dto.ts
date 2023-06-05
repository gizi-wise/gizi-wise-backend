import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { Admin } from '@gizi-wise/admin/entities/admin.entity';
import { Type } from 'class-transformer';
import {
  Allow,
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
} from 'class-validator';
import { Article } from '../entities/article.entity';
import { ArticleTagDto } from './article-tag.dto';

export class ArticleItemDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsOptionalWithEmptyString()
  @IsString()
  summary?: string;

  @IsOptionalWithEmptyString()
  @IsString()
  image?: string;

  @IsOptionalWithEmptyString()
  @IsBoolean()
  isFeatured?: boolean;

  @IsString()
  authorId: string;

  @Allow()
  @Type(() => Admin)
  author: Admin;

  @IsArray()
  @Type(() => ArticleTagDto)
  articleTags: ArticleTagDto[];

  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;

  constructor(data: Article, omit?: string[]) {
    validateAndTransformData.call(this, data, omit);
  }
}
