import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RewardClaimHistoryReadService } from '../sevices/reward-claim-history-read.service';
import { GetRewardClaimHistoryRequestDto } from './dto/get-reward-claim-history.res.dto';

@Controller()
export class RewardClaimHistoryController {
  constructor(private readonly service: RewardClaimHistoryReadService) {}

  @MessagePattern('getRewardClaimHistory')
  getRewardClaimsByUser(@Payload() payload: GetRewardClaimHistoryRequestDto) {
    return this.service.getRewardClaimHistory(payload);
  }
}
