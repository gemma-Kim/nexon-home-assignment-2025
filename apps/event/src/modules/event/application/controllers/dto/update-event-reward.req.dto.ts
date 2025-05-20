import { RewardType } from 'apps/event/src/infrastructure/database/enums/reward.enum';

export class EventRewardDto {
  type: RewardType;
  value: number;
}

export class UpdateEventRewardRequestDto {
  eventId: string;
  rewards: EventRewardDto[];
}
