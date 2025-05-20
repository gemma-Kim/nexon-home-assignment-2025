import { Module } from '@nestjs/common';
import { MockRewardConditionController } from './mock-reward-condition.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/mock-reward-condition/.env'], // 이 앱만 해당
    }),
  ],
  controllers: [MockRewardConditionController],
  providers: [],
})
export class MockRewardConditionModule {}
