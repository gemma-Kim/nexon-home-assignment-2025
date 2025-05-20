import { OnEvent } from '@nestjs/event-emitter';
import { Inject, Injectable } from '@nestjs/common';
import { RewardType } from 'apps/event/src/infrastructure/database/enums/reward.enum';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RewardClaimListener {
  constructor(
    @Inject('MOCK_REWARD_SERVICE')
    private readonly rewardMockClient: ClientProxy,
  ) {}

  @OnEvent('reward.claim.requested')
  async handleRewardClaim(payload: {
    userId: string;
    eventId: string;
    rewards: { type: RewardType; value: number }[];
  }) {
    for (const reward of payload.rewards) {
      this.rewardMockClient.emit('mock.reward.claim', {
        userId: payload.userId,
        eventId: payload.eventId,
        type: reward.type,
        value: reward.value,
      });
    }
  }
}
