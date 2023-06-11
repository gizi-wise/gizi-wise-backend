import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { TkpiModule } from '@gizi-wise/tkpi/tkpi.module';

@Module({
  imports: [SequelizeModule.forFeature([Product]), TkpiModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
