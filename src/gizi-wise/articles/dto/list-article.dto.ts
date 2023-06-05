import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@common/dto/pagination.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { ArticleItemDto } from './article-item.dto';

class ListArticle {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArticleItemDto)
  articles: ArticleItemDto[];
}

export class ResponseListArticleDto extends IntersectionType(
  PaginationDto,
  ListArticle,
) {
  constructor(partial: ResponseListArticleDto) {
    super();
    partial.totalPage = Math.ceil(partial.totalData / partial.limit) || 1;
    validateAndTransformData.call(this, partial);
  }
}
