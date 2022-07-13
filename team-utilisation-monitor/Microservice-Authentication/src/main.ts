import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'microservice-authentication';

  app.setGlobalPrefix(globalPrefix);

  const port = 3000;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/graphql`
  );

}

bootstrap();
