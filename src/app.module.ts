import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import envConfig from '@config/env/env.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getDatabaseConfig } from '@config/database/db.config';
import { GiziWiseModule } from '@gizi-wise/gizi-wise.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    CoreModule,
    SequelizeModule.forRootAsync({
      useFactory: getDatabaseConfig,
    }),
    GiziWiseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
