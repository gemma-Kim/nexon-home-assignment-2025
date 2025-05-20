import { RewardClaimStatus } from 'apps/event/src/infrastructure/database/enums/reward-claim-history.enum';

export class GetRewardClaimHistoryRequestDto {
  eventId?: string[];
  userId?: string[];
  status?: RewardClaimStatus[];
  page?: number = 1;
  limit?: number = 10;
  sortBy?: 'createdAt' | 'status' | 'eventId' = 'createdAt';
  sortOrder?: 'asc' | 'desc' = 'desc';
}
