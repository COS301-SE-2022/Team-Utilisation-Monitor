import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });

  const globalPrefix = 'microservice-authentication';

  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT||3000; //this is not the exposed port on Docker! Don't use the exposed port. The exposed is 

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/graphql`
  );

}

bootstrap();