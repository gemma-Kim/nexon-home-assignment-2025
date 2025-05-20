import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import {
  EventModel,
  EventDocument,
} from 'apps/event/src/infrastructure/database/schemas/event.schema';
import { Model } from 'mongoose';
import {
  RewardRepositoryPort,
  UpdateRewardsByEventIdParams,
} from '../../domain/ports/reward-grant-status.port';

@Injectable()
export class RewardRepository implements RewardRepositoryPort {
  constructor(
    @InjectModel(EventModel.name)
    private readonly model: Model<EventDocument>, // @InjectModel(RewardModel.name) // private readonly rewardModel: Model<RewardDocument>,
  ) {}

  async updateRewardsByEventId(
    eventId: string,
    rewards: UpdateRewardsByEventIdParams[] = [],
  ): Promise<void> {
    await this.model.findOneAndUpdate(
      {
        _id: new ObjectId(eventId),
      },
      {
        $set: {
          rewards: rewards.map((r) => {
            return {
              type: r.type,
              value: r.value,
            };
          }),
        },
      },
    );
  }
}
