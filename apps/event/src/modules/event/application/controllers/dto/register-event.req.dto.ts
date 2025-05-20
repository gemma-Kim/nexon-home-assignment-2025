import { RewardType } from '@event/infrastructure/database/enums/reward.enum';
import {
  ConditionOperatorType,
  EventConditionType,
} from 'apps/event/src/infrastructure/database/enums/condition.enum';

export class RegisterEventConditionDto {
  type: EventConditionType;
  operator: ConditionOperatorType;
  value: number;
}

export class RegisterEventRewardDto {
  type: RewardType;
  value: number;
}

export class RegisterEventRequestDto {
  name: string;
  description?: string;
  startAt: string;
  endAt: string;
  conditions: RegisterEventConditionDto[];
  rewards: RegisterEventRewardDto[];
}
