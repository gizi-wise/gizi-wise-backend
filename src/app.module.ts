import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import envConfig from '@config/env/env.config';

@Module({
  imports: [ConfigModule.forRoot(envConfig), CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
