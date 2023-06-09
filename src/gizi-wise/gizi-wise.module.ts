import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { TkpiModule } from './tkpi/tkpi.module';
import { UserModule } from './user/user.module';
import { FileUploadLogsModule } from './file-upload-logs/file-upload-logs.module';
import { TagsModule } from './tags/tags.module';
import { ArticlesModule } from './articles/articles.module';
import { RecipesModule } from './recipes/recipes.module';
import { APP_GUARD } from '@nestjs/core';
import { ContentTypeGuard } from '@core/guards/content-type.guard';

@Module({
  imports: [
    AuthModule,
    AdminModule,
    UserModule,
    CategoryModule,
    ProductModule,
    TkpiModule,
    TagsModule,
    ArticlesModule,
    RecipesModule,
    FileUploadLogsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ContentTypeGuard,
    },
  ],
})
export class GiziWiseModule {}
