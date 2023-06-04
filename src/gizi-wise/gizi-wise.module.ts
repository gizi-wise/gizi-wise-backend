import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { TkpiModule } from './tkpi/tkpi.module';
import { UserModule } from './user/user.module';
import { FileUploadLogsModule } from './file-upload-logs/file-upload-logs.module';

@Module({
  imports: [
    AuthModule,
    AdminModule,
    UserModule,
    CategoryModule,
    ProductModule,
    TkpiModule,
    FileUploadLogsModule,
  ],
})
export class GiziWiseModule {}
