import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);
  const port = configService.get<number>('PORT');
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nexon Event API')
    .setDescription('Nexon 2025 백엔드 과제 API 문서')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Access token을 입력하세요',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // DTO에 없는 필드 제거
      forbidNonWhitelisted: true, // DTO 외 필드 오면 에러
      transform: true, // payload → DTO 자동 변환
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(port);
}
bootstrap();
