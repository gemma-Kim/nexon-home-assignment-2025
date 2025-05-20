import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpToRpcExceptionFilter } from './common/http-to-rpc-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);
  const port = configService.get<number>('PORT');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port,
        host: '0.0.0.0',
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // DTO에 없는 필드 제거
      forbidNonWhitelisted: true, // DTO 외 필드 오면 에러
      transform: true, // payload → DTO 자동 변환
    }),
  );

  app.useGlobalFilters(new HttpToRpcExceptionFilter());
  await app.listen();
}
bootstrap();
