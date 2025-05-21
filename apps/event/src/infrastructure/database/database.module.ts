import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModel, EventSchema } from './schemas/event.schema';
import {
  RewardClaimHistoryModel,
  RewardClaimHistorySchema,
} from './schemas/reward-claim-history.schem';
import {
  RewardGrantStateModel,
  RewardGrantStateSchema,
} from './schemas/reward-grant-state.schema';

@Module({
  imports: [
    // 레플리카 셋 설정 임시 제거
    MongooseModule.forRoot('mongodb://mongo:27017/event', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // writeConcern: {
      //   w: 'majority',
      //   j: true,
      //   wtimeout: 1000,
      // },
      // readConcern: { level: 'local' },
    }),
    MongooseModule.forFeature([
      { name: EventModel.name, schema: EventSchema },
      {
        name: RewardClaimHistoryModel.name,
        schema: RewardClaimHistorySchema,
      },
      {
        name: RewardGrantStateModel.name,
        schema: RewardGrantStateSchema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: EventModel.name, schema: EventSchema },
      {
        name: RewardClaimHistoryModel.name,
        schema: RewardClaimHistorySchema,
      },
      {
        name: RewardGrantStateModel.name,
        schema: RewardGrantStateSchema,
      },
    ]),
  ],
})
export class DatabaseModule {}
