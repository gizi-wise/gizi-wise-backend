import { Logger, VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HyperExpressAdapter } from './hyper-express-adapter';
import * as cors from 'cors';
import helmet from 'helmet';

async function bootstrap() {
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
  const port = configService.get('PORT');
  await app.listen(port, '0.0.0.0');
  Logger.log(`Server running on port ${port}`, 'Bootstrap');
}
bootstrap();
