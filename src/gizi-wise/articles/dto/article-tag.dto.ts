import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { TagDto } from '@gizi-wise/tags/dto/tag.dto';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ArticleTag } from '../entities/article-tag.entity';
import { Article } from '../entities/article.entity';

export class ArticleTagDto {
  @IsOptionalWithEmptyString()
  @IsNumber()
  id: number;

  @IsOptionalWithEmptyString()
  @IsNumber()
  articleId: number;

  @IsOptionalWithEmptyString()
  @Type(() => Article)
  article: Article;

  @IsOptionalWithEmptyString()
  @IsNumber()
  tagId: number;

  @IsOptionalWithEmptyString()
  @Type(() => TagDto)
  tag: TagDto;

  constructor(data: ArticleTag, omit?: string[]) {
    validateAndTransformData.call(this, data, omit);
  }
}
