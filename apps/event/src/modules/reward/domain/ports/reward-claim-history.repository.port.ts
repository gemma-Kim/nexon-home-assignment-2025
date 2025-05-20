import { ClientSession } from 'mongoose';
import { RewardEntity } from '../../../event/domain/entities/reward.entity';
import { RewardClaimStatus } from 'apps/event/src/infrastructure/database/enums/reward-claim-history.enum';
import { RewardClaimHistoryEntity } from '../entities/reward-claim-history.entity';

export interface CreateClaimHistoryParams {
  eventId: string;
  userId: string;
  status: RewardClaimStatus;
  reason?: string;
  rewards?: RewardEntity[];
}

export interface FindRewardClaimHistoryFilterParams {
  userId?: string[];
  eventId?: string[];
  status?: RewardClaimStatus[];
  sortBy?: 'createdAt' | 'status' | 'eventId';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface RewardClaimHistoryRepositoryPort {
  create(
    history: CreateClaimHistoryParams,
    session?: ClientSession,
  ): Promise<void>;
  findLatestByUserId(
    userId: string,
  ): Promise<RewardClaimHistoryEntity[] | null>;
  findMany(
    filter: FindRewardClaimHistoryFilterParams,
  ): Promise<RewardClaimHistoryEntity[]>;
}
