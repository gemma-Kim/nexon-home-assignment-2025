import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import {
  CreateClaimHistoryParams,
  FindRewardClaimHistoryFilterParams,
  RewardClaimHistoryRepositoryPort,
} from '../../domain/ports/reward-claim-history.repository.port';
import { ClientSession, Model } from 'mongoose';
import {
  RewardClaimHistoryDocument,
  RewardClaimHistoryModel,
} from 'apps/event/src/infrastructure/database/schemas/reward-claim-history.schem';
import { RewardMapper } from '../../../event/infrastructure/mappers/reward.mapper';
import { RewardClaimHistoryEntity } from '../../domain/entities/reward-claim-history.entity';
import { RewardClaimHistoryMapper } from '../mappers/reward-claim-history.mapper';

@Injectable()
export class RewardClaimHistoryRepository
  implements RewardClaimHistoryRepositoryPort
{
  constructor(
    @InjectModel(RewardClaimHistoryModel.name)
    private readonly model: Model<RewardClaimHistoryDocument>,
  ) {}

  async create(
    history: CreateClaimHistoryParams,
    session?: ClientSession,
  ): Promise<void> {
    await this.model.create(
      [
        {
          ...history,
          rewards: history?.rewards
            ? history?.rewards.map(RewardMapper.toPersistence)
            : [],
          eventId: new ObjectId(history.eventId),
        },
      ],
      { session: session || undefined },
    );
  }

  async findLatestByUserId(
    userId: string,
  ): Promise<RewardClaimHistoryEntity[] | null> {
    const docs = await this.model.find({ userId }, null, {
      sort: { createdAt: -1 },
    });
    return docs.map(RewardClaimHistoryMapper.toDomain);
  }

  async findMany(
    params: FindRewardClaimHistoryFilterParams,
  ): Promise<RewardClaimHistoryEntity[]> {
    const {
      eventId,
      status,
      userId,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = params;

    const filter: Record<string, any> = { userId };

    if (userId?.length) {
      filter.userId = { $in: userId };
    }

    if (eventId?.length) {
      filter.eventId = {
        $in: eventId
          .filter((eId) => ObjectId.isValid(eId))
          .map((id) => new ObjectId(id)),
      };
    }

    if (status?.length) {
      filter.status = { $in: status };
    }

    const sort: Record<string, 1 | -1> = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1,
    };

    const skip = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

    const docs = await this.model
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit.toString()));

    return docs.map(RewardClaimHistoryMapper.toDomain);
  }
}
