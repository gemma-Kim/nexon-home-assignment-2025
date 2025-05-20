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
    MongooseModule.forRoot('mongodb://mongo:27017/event?replicaSet=rs0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000,
      },
      readConcern: { level: 'majority' },
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
