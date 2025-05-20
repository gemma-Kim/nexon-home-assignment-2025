import { Module } from '@nestjs/common';
import { MockRewardController } from './mock-reward.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EVENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.EVENT_SERVICE,
          port: parseInt(process.env.EVENT_SERVICE_PORT),
        },
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/mock-reward/.env'], // 이 앱만 해당
    }),
  ],
  controllers: [MockRewardController],
  providers: [],
})
export class MockRewardModule {}
