import { RewardType } from 'apps/event/src/infrastructure/database/enums/reward.enum';

export interface UpdateRewardsByEventIdParams {
  type: RewardType;
  value: number;
}

export interface RewardRepositoryPort {
  updateRewardsByEventId(
    eventId: string,
    rewards: UpdateRewardsByEventIdParams[],
  ): Promise<void>;
}
