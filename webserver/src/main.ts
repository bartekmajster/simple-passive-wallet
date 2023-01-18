import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { WEBSERVER_PORT } from 'common/config/env';
import { PrismaService } from 'prisma/prisma.service';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.enableCors({
    credentials: true,
    exposedHeaders: ['Set-cookie'],
    origin: ['http://localhost:3000'],
  });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true }));

  await app.listen(WEBSERVER_PORT);
};

bootstrap();
