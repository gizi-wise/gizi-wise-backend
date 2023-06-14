import { CloudStorageService } from '@common/cloud-storage/cloud-storage.service';
import { Admin } from '@gizi-wise/admin/entities/admin.entity';
import { Tag } from '@gizi-wise/tags/entities/tag.entity';
import { TagsService } from '@gizi-wise/tags/tags.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Includeable, Op, WhereOptions } from 'sequelize';
import { ArticleDto } from './dto/article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { QueryListArticleDto } from './dto/query-list-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleTag } from './entities/article-tag.entity';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  private readonly errorMessages = {
    notFound: 'Article not found',
  };

  constructor(
    @InjectModel(Article)
    private readonly articleModel: typeof Article,
    @InjectModel(ArticleTag)
    private readonly articleTagModel: typeof ArticleTag,
    private readonly tagService: TagsService,
    private readonly cloudStorageService: CloudStorageService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const { articleTags, summary } = createArticleDto;
    try {
      for (let i = 0; i < articleTags.length; i++) {
        await this.tagService.findOne(articleTags[i]);
      }
      if (!summary) {
        const summary = createArticleDto.content
          .replace(/<img[^>]*>/g, '')
          .replace(/<[^>]+>/g, '')
          .substring(0, 100);
        createArticleDto.summary = summary;
      }
      const article = await this.articleModel.create({
        ...createArticleDto,
      });
      for (let i = 0; i < articleTags.length; i++) {
        await this.articleTagModel.create({
          articleId: article.id,
          tagId: articleTags[i],
        });
      }
      return this.findOne(article.id);
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: QueryListArticleDto) {
    const {
      limit,
      offset,
      title,
      order,
      sort,
      articleTags,
      authorId,
      isFeatured,
    } = query;
    try {
      const whereOptions: WhereOptions = {};
      if (title) {
        whereOptions['title'] = {
          [Op.iLike]: `%${title}%`,
        };
      }
      if (authorId) {
        whereOptions['authorId'] = authorId;
      }
      if (typeof isFeatured === 'boolean') {
        whereOptions['isFeatured'] = isFeatured;
      }
      const include: Includeable[] = [
        {
          model: ArticleTag,
          attributes: ['tagId'],
          include: [
            {
              model: Tag,
              attributes: ['name'],
            },
          ],
        },
        {
          model: Admin,
          attributes: ['name'],
        },
      ];
      if (articleTags) {
        const tagIds = articleTags
          .split(',')
          .map((tagId) => parseInt(tagId.trim(), 10));
        include[0]['where'] = {
          tagId: {
            [Op.in]: tagIds,
          },
        };
      }
      const { rows, count } = await this.articleModel.findAndCountAll({
        where: whereOptions,
        attributes: {
          exclude: ['deletedAt'],
        },
        include,
        limit,
        offset,
        order: [[sort, order]],
        distinct: true,
      });
      return {
        articles: rows.map((article) => new ArticleDto(article)),
        count,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const article = await this.articleModel.findOne({
        where: { id },
        include: [
          {
            model: ArticleTag,
            attributes: ['tagId'],
            include: [
              {
                model: Tag,
                attributes: ['name'],
              },
            ],
          },
          {
            model: Admin,
            attributes: ['name'],
          },
        ],
      });
      if (!article) throw new NotFoundException(this.errorMessages.notFound);
      return new ArticleDto(article);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    try {
      const article = await this.findOne(id);
      const { articleTags, ...payloads } = updateArticleDto;
      if (!payloads.summary && payloads.content) {
        const summary = payloads.content
          .replace(/<img[^>]*>/g, '')
          .replace(/<[^>]+>/g, '')
          .substring(0, 100);
        payloads.summary = summary;
      }
      const [affectedRows] = await this.articleModel.update(payloads, {
        where: { id },
      });

      if (affectedRows && articleTags) {
        for (let i = 0; i < articleTags.length; i++) {
          await this.tagService.findOne(articleTags[i]);
        }
        const getCurrentTagIds = await this.articleTagModel.findAll({
          where: { articleId: id },
          attributes: ['tagId'],
        });

        const tagIdsToDelete = getCurrentTagIds.filter(
          (tag) => !articleTags.includes(tag.tagId),
        );

        await this.articleTagModel.destroy({
          where: {
            articleId: id,
            tagId: {
              [Op.in]: tagIdsToDelete.map((t) => t.tagId),
            },
          },
        });

        const tagIdsToAdd = articleTags.filter(
          (tag) => !getCurrentTagIds.map((t) => t.tagId).includes(tag),
        );

        for (let i = 0; i < tagIdsToAdd.length; i++) {
          await this.articleTagModel.create({
            articleId: id,
            tagId: tagIdsToAdd[i],
          });
        }
      }
      if (article.image && payloads.image && article.image !== payloads.image) {
        await this.cloudStorageService.deleteFile(article.image);
      }
      return this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const article = await this.findOne(id);
      const affectedRows = await this.articleModel.destroy({
        where: { id },
      });
      if (affectedRows === 0) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      if (article.image) {
        await this.cloudStorageService.deleteFile(article.image);
      }
      return { message: 'Article deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}
