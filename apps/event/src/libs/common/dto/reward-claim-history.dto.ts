import {
  RewardClaimStatus,
  RewardClaimResultReason,
} from 'apps/event/src/infrastructure/database/enums/reward-claim-history.enum';
import { RewardDto } from './reward.dto';

export class RewardClaimHistoryDto {
  id: string;
  eventId: string;
  userId: string;
  status: RewardClaimStatus;
  reason?: RewardClaimResultReason;
  rewards: RewardDto[];
  createdAt: string;

  constructor(props: {
    id: string;
    eventId: string;
    userId: string;
    status: RewardClaimStatus;
    reason?: RewardClaimResultReason;
    rewards?: RewardDto[];
    createdAt?: string;
  }) {
    this.id = props.id;
    this.eventId = props.eventId;
    this.userId = props.userId;
    this.status = props.status;
    this.reason = props.reason;
    this.rewards = props.rewards ?? [];
    this.createdAt = props.createdAt;
  }
}
