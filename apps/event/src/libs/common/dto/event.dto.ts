import { EventStatus } from 'apps/event/src/infrastructure/database/enums/event.enum';
import { RewardDto } from './reward.dto';
import { EventConditionDto } from './condition.dto';

export class EventDto {
  id: string;
  name: string;
  description?: string;
  status: EventStatus;
  startAt: string;
  endAt: string;
  createdAt?: string;
  updatedAt?: string;
  conditions: EventConditionDto[] = [];
  rewards: RewardDto[] = [];

  constructor(props: {
    id: string;
    name: string;
    description?: string;
    status: EventStatus;
    startAt: string;
    endAt: string;
    createdAt?: string;
    updatedAt?: string;
    conditions?: EventConditionDto[];
    rewards?: RewardDto[];
  }) {
    this.rewards = props.rewards.map((r) => new RewardDto(r));
    Object.assign(this, props);
  }
}
