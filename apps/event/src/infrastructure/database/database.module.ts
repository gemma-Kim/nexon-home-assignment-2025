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
  exports: [MongooseModule],
})
export class DatabaseModule {}
