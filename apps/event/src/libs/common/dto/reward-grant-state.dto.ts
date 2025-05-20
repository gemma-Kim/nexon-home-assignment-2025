import { RewardDto } from './reward.dto';

export class RewardGrantStateDto {
  id: string;
  eventId: string;
  userId: string;
  requestedRewards: RewardDto[];
  grantedRewards: RewardDto[];
  isFullyGranted: boolean;
  createdAt?: string;
  updatedAt?: string;

  constructor(props: RewardGrantStateDto) {
    Object.assign(this, props);
  }
}
