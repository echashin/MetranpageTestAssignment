import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeOptions } from './validation-pipe-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: 'Authorization, *',
  });

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
