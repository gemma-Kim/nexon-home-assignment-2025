// import {
//   RewardClaimResultReason,
//   RewardClaimStatus,
// } from 'apps/event/src/infrastructure/database/enums/reward-claim-history.enum';
import {
  RewardClaimResultReason,
  RewardClaimStatus,
} from '../../enums/reward-claim-history';
import { RewardType } from '../../enums/reward.enum';

export class RewardDto {
  id: string;
  type: RewardType;
  value: number;
  createdAt?: string;
  updatedAt?: string;

  constructor(props: {
    id: string;
    type: RewardType;
    value: number;
    createdAt?: string;
    updatedAt?: string;
  }) {
    this.id = props.id;
    this.type = props.type;
    this.value = props.value;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}

export class GetRewardClaimHistoryByUserResponseDto {
  id: string;
  eventId: string;
  userId: string;
  status: RewardClaimStatus;
  reason?: RewardClaimResultReason;
  rewards?: RewardDto[];
  createdAt: string;

  constructor(props: {
    id: string;
    eventId: string;
    userId: string;
    status: RewardClaimStatus;
    reason?: RewardClaimResultReason;
    rewards?: RewardDto[];
    createdAt: string;
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
