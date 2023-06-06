import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipe } from './entities/recipe.entity';
import { RecipeTag } from './entities/recipe-tag.entity';
import { TagsModule } from '@gizi-wise/tags/tags.module';

@Module({
  imports: [SequelizeModule.forFeature([Recipe, RecipeTag]), TagsModule],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}
