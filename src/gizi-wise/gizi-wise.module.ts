import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AdminModule, CategoryModule],
})
export class GiziWiseModule {}
