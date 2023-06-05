import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from './entities/article.entity';
import { ArticleTag } from './entities/article-tag.entity';
import { TagsModule } from '@gizi-wise/tags/tags.module';

@Module({
  imports: [SequelizeModule.forFeature([Article, ArticleTag]), TagsModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
