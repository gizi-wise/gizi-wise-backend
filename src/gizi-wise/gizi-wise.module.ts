import { Module } from '@nestjs/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AdminModule, AdminAuthModule, CategoryModule],
})
export class GiziWiseModule {}
