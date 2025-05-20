import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RewardEventPublisher } from '../reward-event-publisher.interface';

@Injectable()
export class EventEmitterRewardPublisher implements RewardEventPublisher {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async publishRewardClaimRequested(payload: {
    userId: string;
    eventId: string;
    rewards: { type: string; value: number }[];
  }): Promise<void> {
    this.eventEmitter.emit('reward.claim.requested', payload);
  }
}
