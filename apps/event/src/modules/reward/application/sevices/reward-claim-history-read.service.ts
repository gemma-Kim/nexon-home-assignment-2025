import { Inject, Injectable } from '@nestjs/common';
import { RewardClaimHistoryDto } from 'apps/event/src/libs/common/dto/reward-claim-history.dto';
import { RewardClaimHistoryRepository } from '../../infrastructure/repositories/reward-claim-history.repository';
import { RewardClaimHistoryMapper } from '../../infrastructure/mappers/reward-claim-history.mapper';
import { GetRewardClaimHistoryRequestDto } from '../controllers/dto/get-reward-claim-history.res.dto';
import { RewardClaimStatus } from 'apps/event/src/infrastructure/database/enums/reward-claim-history.enum';

@Injectable()
export class RewardClaimHistoryReadService {
  constructor(
    @Inject('RewardClaimHistoryRepository')
    private readonly rewardClaimHistoryRepository: RewardClaimHistoryRepository,
  ) {}

  async existSuccessOrRequestedHistory(
    userId: string,
    eventId: string,
  ): Promise<boolean> {
    const histories = await this.rewardClaimHistoryRepository.findMany({
      userId: [userId],
      eventId: [eventId],
      status: [RewardClaimStatus.SUCCESS, RewardClaimStatus.REQUESTED],
    });

    return histories.length ? true : false;
  }

  async getRewardClaimHistory(
    dto: GetRewardClaimHistoryRequestDto,
  ): Promise<RewardClaimHistoryDto[]> {
    const histories = await this.rewardClaimHistoryRepository.findMany(dto);
    return histories.map(RewardClaimHistoryMapper.toDto);
  }
}
