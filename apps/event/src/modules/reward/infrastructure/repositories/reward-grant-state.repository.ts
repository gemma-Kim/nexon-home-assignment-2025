import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { RewardMapper } from '../../../event/infrastructure/mappers/reward.mapper';
import {
  RewardGrantStateDocument,
  RewardGrantStateModel,
} from 'apps/event/src/infrastructure/database/schemas/reward-grant-state.schema';
import { RewardGrantStateEntity } from '../../domain/entities/reward-grant-state.entity';
import { RewardGrantStateRepositoryPort } from '../../domain/ports/reward-grant-state.repository.port';
import { RewardGrantStateMapper } from '../mappers/reward-grant-state.mapper';
import { RewardEntity } from '../../../event/domain/entities/reward.entity';

@Injectable()
export class RewardGrantStateRepository
  implements RewardGrantStateRepositoryPort
{
  constructor(
    @InjectModel(RewardGrantStateModel.name)
    private readonly model: Model<RewardGrantStateDocument>,
  ) {}

  async create(
    eventId: string,
    userId: string,
    requestedRewards: RewardEntity[],
    grantedRewards: RewardEntity[] = [],
    session?: ClientSession,
  ): Promise<RewardGrantStateEntity> {
    const [doc] = await this.model.create(
      [
        {
          eventId: new Types.ObjectId(eventId),
          userId: userId,
          requestedRewards: requestedRewards.map(RewardMapper.toPersistence),
          grantedRewards: grantedRewards.map(RewardMapper.toPersistence),
        },
      ],
      {
        session: session || undefined,
      },
    );
    return RewardGrantStateMapper.toDomain(doc);
  }

  async findByEventIdAndUserId(
    eventId: string,
    userId: string,
  ): Promise<RewardGrantStateEntity | null> {
    const doc = await this.model.findOne({
      eventId: new Types.ObjectId(eventId),
      userId,
    });
    return doc ? RewardGrantStateMapper.toDomain(doc) : null;
  }

  async updateGrantedRewards(
    id: string,
    grantedRewards: RewardEntity[],
    isFullyGranted: boolean,
    updatedAt: Date,
  ): Promise<void> {
    await this.model.updateOne(
      { id: new Types.ObjectId(id) },
      {
        $set: {
          grantedRewards: grantedRewards.map(RewardMapper.toPersistence),
          isFullyGranted,
          updatedAt,
        },
      },
    );
  }
}
