import { CloudStorageService } from '@common/cloud-storage/cloud-storage.service';
import { Admin } from '@gizi-wise/admin/entities/admin.entity';
import { Tag } from '@gizi-wise/tags/entities/tag.entity';
import { TagsService } from '@gizi-wise/tags/tags.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Includeable, Op, WhereOptions } from 'sequelize';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { QueryListRecipeDto } from './dto/query-list-recipe.dto';
import { RecipeItemDto } from './dto/recipe-item.dto';
import { RecipeDto } from './dto/recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeTag } from './entities/recipe-tag.entity';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  private readonly errorMessages = {
    notFound: 'Recipe not found',
  };

  constructor(
    @InjectModel(Recipe)
    private readonly recipeModel: typeof Recipe,
    @InjectModel(RecipeTag)
    private readonly recipeTagModel: typeof RecipeTag,
    private readonly tagService: TagsService,
    private readonly cloudStorageService: CloudStorageService,
  ) {}

  async create(createRecipeDto: CreateRecipeDto) {
    const { recipeTags } = createRecipeDto;
    try {
      for (let i = 0; i < recipeTags.length; i++) {
        await this.tagService.findOne(recipeTags[i]);
      }
      const recipe = await this.recipeModel.create({
        ...createRecipeDto,
      });
      for (let i = 0; i < recipeTags.length; i++) {
        await this.recipeTagModel.create({
          recipeId: recipe.id,
          tagId: recipeTags[i],
        });
      }
      return this.findOne(recipe.id);
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: QueryListRecipeDto) {
    const {
      limit,
      offset,
      title,
      order,
      sort,
      recipeTags,
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
          model: RecipeTag,
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
      if (recipeTags) {
        const tagIds = recipeTags
          .split(',')
          .map((tagId) => parseInt(tagId.trim(), 10));
        include[0]['where'] = {
          tagId: {
            [Op.in]: tagIds,
          },
        };
      }
      const { rows, count } = await this.recipeModel.findAndCountAll({
        where: whereOptions,
        attributes: {
          exclude: ['ingredients', 'instructions', 'deletedAt'],
        },
        include,
        limit,
        offset,
        order: [[sort, order]],
        distinct: true,
      });
      return {
        recipes: rows.map((recipe) => new RecipeItemDto(recipe)),
        count,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const recipe = await this.recipeModel.findOne({
        where: { id },
        include: [
          {
            model: RecipeTag,
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
      if (!recipe) throw new NotFoundException(this.errorMessages.notFound);
      return new RecipeDto(recipe);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    try {
      const recipe = await this.findOne(id);
      const { recipeTags, ...payloads } = updateRecipeDto;
      const [affectedRows] = await this.recipeModel.update(payloads, {
        where: { id },
      });

      if (affectedRows && recipeTags) {
        for (let i = 0; i < recipeTags.length; i++) {
          await this.tagService.findOne(recipeTags[i]);
        }
        const getCurrentTagIds = await this.recipeTagModel.findAll({
          where: { recipeId: id },
          attributes: ['tagId'],
        });

        const tagIdsToDelete = getCurrentTagIds.filter(
          (tag) => !recipeTags.includes(tag.tagId),
        );

        await this.recipeTagModel.destroy({
          where: {
            recipeId: id,
            tagId: {
              [Op.in]: tagIdsToDelete.map((t) => t.tagId),
            },
          },
        });

        const tagIdsToAdd = recipeTags.filter(
          (tag) => !getCurrentTagIds.map((t) => t.tagId).includes(tag),
        );

        for (let i = 0; i < tagIdsToAdd.length; i++) {
          await this.recipeTagModel.create({
            recipeId: id,
            tagId: tagIdsToAdd[i],
          });
        }
      }
      if (recipe.image && payloads.image && recipe.image !== payloads.image) {
        await this.cloudStorageService.deleteFile(recipe.image);
      }
      return this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const recipe = await this.findOne(id);
      const affectedRows = await this.recipeModel.destroy({
        where: { id },
      });
      if (affectedRows === 0) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      if (recipe.image) {
        await this.cloudStorageService.deleteFile(recipe.image);
      }
      return { message: 'Recipe deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}
