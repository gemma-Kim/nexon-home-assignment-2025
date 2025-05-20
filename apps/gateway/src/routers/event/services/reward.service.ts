import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ReplaceRewardRequestDto } from '../dto/reward/replace-reward.req.dto';

@Injectable()
export class RewardService {
  @Inject('EVENT_SERVICE') private client: ClientProxy;

  async replaceEventReward(
    eventId: string,
    dto: ReplaceRewardRequestDto,
  ): Promise<void> {
    await firstValueFrom(
      this.client.send('replaceEventReward', { eventId, ...dto }),
    );
  }

  async claimRewardByUser(userId: number, eventId: string): Promise<Object> {
    return await firstValueFrom(
      this.client.send('claimRewardByUser', { userId, eventId }),
    );
  }
}
