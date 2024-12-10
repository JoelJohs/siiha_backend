/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en los DTOs
      forbidNonWhitelisted: true, // Lanza errores si se envían propiedades no definidas
      transform: true, // Convierte los tipos de datos a los especificados en los DTOs
      transformOptions: {
        enableImplicitConversion: true, // Convierte tipos de datos de forma implícita
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
