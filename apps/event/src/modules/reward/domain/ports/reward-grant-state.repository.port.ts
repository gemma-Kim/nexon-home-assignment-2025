import { ClientSession } from 'mongoose';
import { RewardGrantStateEntity } from '../entities/reward-grant-state.entity';
import { RewardEntity } from '../../../event/domain/entities/reward.entity';

export interface RewardGrantStateRepositoryPort {
  create(
    eventId: string,
    userId: string,
    requestedRewards: RewardEntity[],
    grantedRewards: RewardEntity[],
    session?: ClientSession,
  ): Promise<RewardGrantStateEntity>;

  findByEventIdAndUserId(
    eventId: string,
    userId: string,
  ): Promise<RewardGrantStateEntity | null>;

  updateGrantedRewards(
    id: string,
    grantedRewards: RewardEntity[],
    isFullyGranted: boolean,
    updatedAt: Date,
  ): Promise<void>;
}
