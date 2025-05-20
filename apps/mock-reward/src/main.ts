import { NestFactory } from '@nestjs/core';
import { MockRewardModule } from './mock-reward.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MockRewardModule,
    {
      transport: Transport.TCP,
      options: { port: 3000, host: '0.0.0.0' },
    },
  );

  await app.listen();
}
bootstrap();
