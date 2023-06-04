import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import envConfig from '@config/env/env.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getDatabaseConfig } from '@config/database/db.config';
import { GiziWiseModule } from '@gizi-wise/gizi-wise.module';
import { CommonModule } from './common/common.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    CoreModule,
    SequelizeModule.forRootAsync({
      useFactory: getDatabaseConfig,
    }),
    EventEmitterModule.forRoot(),
    GiziWiseModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
