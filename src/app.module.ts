import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import envConfig from '@config/env/env.config';

@Module({
  imports: [ConfigModule.forRoot(envConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
