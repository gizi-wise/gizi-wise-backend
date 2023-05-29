import { Module } from '@nestjs/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { TkpiModule } from './tkpi/tkpi.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AdminModule,
    AdminAuthModule,
    CategoryModule,
    ProductModule,
    TkpiModule,
    UserModule,
  ],
})
export class GiziWiseModule {}
