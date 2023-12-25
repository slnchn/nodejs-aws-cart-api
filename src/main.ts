import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { configure as serverlessExpress } from '@vendia/serverless-express';

import helmet from 'helmet';

import { AppModule } from './app.module';

dotenv.config();

// if dev run on localhost
if (process.env.NODE_ENV !== 'production') {
  (async () => {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: (req, callback) => callback(null, true),
    });

    app.use(helmet());

    await app.listen(4000);
  })();
}

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });

  app.use(helmet());

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}
