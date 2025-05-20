import { RewardDto } from 'apps/event/src/libs/common/dto/reward.dto';

export interface RewardGrantedEvent {
  userId: string;
  eventId: string;
  rewards: RewardDto[];
  grantedAt: string; // ISO string (new Date().toISOString())
}
