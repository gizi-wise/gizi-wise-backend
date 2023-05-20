import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import envConfig from '@config/env/env.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getDatabaseConfig } from '@config/env/database/db.config';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    CoreModule,
    SequelizeModule.forRootAsync({
      useFactory: getDatabaseConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
