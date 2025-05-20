import {
  RewardClaimResultReason,
  RewardClaimStatus,
} from 'apps/event/src/infrastructure/database/enums/reward-claim-history.enum';
import { RewardEntity } from '../../../event/domain/entities/reward.entity';

export class RewardClaimHistoryEntity {
  constructor(
    readonly id: string,
    readonly eventId: string,
    readonly userId: string,
    protected status: RewardClaimStatus,
    protected reason: RewardClaimResultReason,
    protected rewards: RewardEntity[] = [],
    readonly createdAt?: Date,
  ) {}

  getStatus(): RewardClaimStatus {
    return this.status;
  }

  getReason(): RewardClaimResultReason {
    return this.reason;
  }

  getRewards(): RewardEntity[] {
    return this.rewards;
  }
}
