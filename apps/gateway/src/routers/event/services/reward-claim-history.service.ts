import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GetRewardClaimHistoryRequestDto } from '../dto/reward-claim-history/get-reward-claim-history.req.dto';
import { GetRewardClaimHistoryByUserResponseDto } from '../dto/reward-claim-history/get-reward-claim-history-by-user.res.dto';
import { GetRewardClaimHistoryResponseDto } from '../dto/reward-claim-history/get-reward-claim-history.res.dto';

@Injectable()
export class RewardClaimHistoryService {
  @Inject('EVENT_SERVICE') private client: ClientProxy;

  async getRewardClaimHistoryByUser(
    dto: GetRewardClaimHistoryRequestDto,
  ): Promise<GetRewardClaimHistoryByUserResponseDto[]> {
    return await firstValueFrom(this.client.send('getRewardClaimHistory', dto));
  }

  async getRewardClaimHistory(
    dto: GetRewardClaimHistoryRequestDto,
  ): Promise<GetRewardClaimHistoryResponseDto[]> {
    return await firstValueFrom(this.client.send('getRewardClaimHistory', dto));
  }
}
