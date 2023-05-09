import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as express from 'express';
import { INestApplication } from '@nestjs/common';

function setupProxy(app: INestApplication) {
  const proxyOptions = {
    target: 'https://reviewly-server.onrender.com',
    changeOrigin: true,
  };

  app.use('/api', createProxyMiddleware(proxyOptions));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  setupProxy(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
