import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import * as express from 'express';
import { Constants } from './utility/constants';
import { AllExceptionsFilter } from './all-exceptions.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ 
    origin: [ Constants.ORIGIN_URL.MERCHANTS_3000,  Constants.ORIGIN_URL.MERCHANTS_3002, 'http://localhost:8100'],// Allow requests from this origin
    methods: Constants.SERVER.ALLOWED_METHOD, // Allowed methods
    credentials: true, // Allow credentials (like cookies)
  }));
  app.use(express.json())
 
  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const { httpAdapter } = app.get(HttpAdapterHost) 
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))

  await app.listen(Constants.SERVER.RUNNING_PORT);
}
bootstrap();
