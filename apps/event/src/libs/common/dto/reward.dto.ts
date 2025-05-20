import { RewardType } from 'apps/event/src/infrastructure/database/enums/reward.enum';

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
    Object.assign(this, props);
  }
}
