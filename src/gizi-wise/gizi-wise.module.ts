import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { TkpiModule } from './tkpi/tkpi.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    AdminModule,
    UserModule,
    CategoryModule,
    ProductModule,
    TkpiModule,
  ],
})
export class GiziWiseModule {}
