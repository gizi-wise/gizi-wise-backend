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
import { contentTypeMiddleware } from '@core/middlewares/content-type.middleware';

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
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.use(contentTypeMiddleware);

  // SwaggerModule: Start
  const setUrlException = new Set(['/favicon.ico', '/docs', '/docs/']);
  app.use((req, res, next) => {
    if (!setUrlException.has(req.originalUrl)) {
      return next();
    }

    if (req.originalUrl === '/favicon.ico') {
      return res.status(204).json();
    }

    if (setUrlException.has(req.originalUrl)) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.send(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Gizi Wise API - SwaggerUI"
          />
          <title>Gizi Wise API - SwaggerUI</title>
          <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css" />
        </head>
        <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js" crossorigin></script>
        <script>
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              url: '/docs-json',
              dom_id: '#swagger-ui',
            });
          };
        </script>
        </body>
        </html>`,
      );
    }
  });
  const config = new DocumentBuilder()
    .setTitle('Gizi Wise API')
    .setDescription('Gizi Wise API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // SwaggerModule: End

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
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
