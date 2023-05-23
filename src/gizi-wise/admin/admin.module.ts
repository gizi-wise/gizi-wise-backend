import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminAuthModule } from './admin-auth/admin-auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Admin]), AdminAuthModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
