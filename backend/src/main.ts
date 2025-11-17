import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix(`api/${configService.get<string>('API_VERSION')}`);

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('CCFVS API')
    .setDescription('Campus Classroom & Facilities Visualization System API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('buildings', 'Building management endpoints')
    .addTag('floors', 'Floor management endpoints')
    .addTag('rooms', 'Room management endpoints')
    .addTag('schedules', 'Schedule management endpoints')
    .addTag('import', 'Data import endpoints')
    .addTag('auth', 'Authentication endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('PORT') || 3001;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
