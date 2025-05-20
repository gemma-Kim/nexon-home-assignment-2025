import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RewardClaimService {
  @Inject('EVENT_SERVICE') private client: ClientProxy;

  async claimRewardByUser(userId: number, eventId: string): Promise<Object> {
    return await firstValueFrom(
      this.client.send('claimRewardByUser', { userId, eventId }),
    );
  }
}
