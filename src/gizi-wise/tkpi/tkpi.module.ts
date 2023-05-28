import { Module } from '@nestjs/common';
import { TkpiService } from './tkpi.service';
import { TkpiController } from './tkpi.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tkpi } from './entities/tkpi.entity';

@Module({
  imports: [SequelizeModule.forFeature([Tkpi])],
  controllers: [TkpiController],
  providers: [TkpiService],
  exports: [TkpiService],
})
export class TkpiModule {}
