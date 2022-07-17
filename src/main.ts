import { NestFactory } from '@nestjs/core';
import { ENV } from './app.env';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(ENV.port);
  console.log('[app] env:', ENV.nodeEnv);
  console.log('[app] port:', ENV.port);
};

bootstrap();
