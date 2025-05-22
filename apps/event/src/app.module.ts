import { Module } from '@nestjs/common';
import { EventModule } from './modules/event/event.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { RewardModule } from './modules/reward/reward.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    EventModule,
    RewardModule,
    DatabaseModule,
    MongooseModule.forRoot(
      'mongodb://mongo:27017/event?replicaSet=rs0&directConnection=true',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        writeConcern: {
          w: 'majority',
          j: true,
          wtimeout: 1000,
        },
        readConcern: { level: 'local' },
      },
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/event/.env'], // 이 앱만 해당
    }),
  ],
  providers: [],
})
export class AppModule {}
