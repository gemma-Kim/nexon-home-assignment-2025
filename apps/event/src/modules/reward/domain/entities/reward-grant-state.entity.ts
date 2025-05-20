import { RewardEntity } from '../../../event/domain/entities/reward.entity';

export class RewardGrantStateEntity {
  readonly id: string;
  readonly eventId: string;
  readonly userId: string;
  readonly requestedRewards: RewardEntity[];
  readonly grantedRewards: RewardEntity[] = [];
  readonly isFullyGranted: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(props: {
    id: string;
    eventId: string;
    userId: string;
    requestedRewards: RewardEntity[];
    grantedRewards: RewardEntity[];
    isFullyGranted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    Object.assign(this, props);
  }

  isComplete(): boolean {
    return this.isFullyGranted;
  }
}
