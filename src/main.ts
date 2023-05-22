import {
  Logger,
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HyperExpressAdapter } from './hyper-express-adapter';
import * as cors from 'cors';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const now = Date.now();
  const app = await NestFactory.create(AppModule, new HyperExpressAdapter());
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Accept-Version',
    defaultVersion: [VERSION_NEUTRAL, '1'],
  });
  const configService = app.get(ConfigService);
  const nodeEnv = configService.get('NODE_ENV');
  const corsOptionsDelegate = (req, res) => {
    if (nodeEnv === 'production') {
      res(null, { origin: /giziwise\.my\.id$/ });
    } else {
      res(null, { origin: '*' });
    }
  };
  app.use(cors(corsOptionsDelegate));
  if (nodeEnv === 'production') {
    app.use(helmet());
  }
  const config = new DocumentBuilder()
    .setTitle('Gizi Wise API')
    .setDescription('Gizi Wise API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const port = configService.get('PORT');
  await app.listen(port, '0.0.0.0');
  Logger.log(
    `Server running on port ${port}, initialize time: ${Date.now() - now}ms`,
    'Bootstrap',
  );
}
bootstrap();
