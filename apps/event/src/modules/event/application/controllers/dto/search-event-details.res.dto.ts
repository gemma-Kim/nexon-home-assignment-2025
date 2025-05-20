import { EventConditionType } from 'apps/event/src/infrastructure/database/enums/condition.enum';
import { EventStatus } from 'apps/event/src/infrastructure/database/enums/event.enum';
import { RewardType } from 'apps/event/src/infrastructure/database/enums/reward.enum';

export class SearchEventDetailResponseDto {
  id: string;
  name: string;
  description?: string;
  status: EventStatus;
  startAt: string;
  endAt: string;
  createdAt?: string;
  updatedAt?: string;
  conditions: {
    type: EventConditionType;
    operator: string;
    value: number;
  }[];
  rewards: {
    type: RewardType;
    value: number;
  }[];

  constructor(props: {
    id: string;
    name: string;
    description?: string;
    status: EventStatus;
    startAt: string;
    endAt: string;
    createdAt?: string;
    updatedAt?: string;
    conditions: {
      type: EventConditionType;
      operator: string;
      value: number;
    }[];
    rewards: {
      type: RewardType;
      value: number;
    }[];
  }) {
    Object.assign(this, props);
  }
}
