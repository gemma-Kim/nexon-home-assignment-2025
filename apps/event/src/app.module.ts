import { Module } from '@nestjs/common';
import { EventModule } from './modules/event/event.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { RewardModule } from './modules/reward/reward.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    EventModule,
    RewardModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/event/.env'], // 이 앱만 해당
    }),
  ],
  providers: [],
})
export class AppModule {}
