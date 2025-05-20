import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateEventRewardRequestDto } from './dto/update-event-reward.req.dto';
import { RewardService } from '../services/reward.service';
import { ClaimRewardByUserRequestDto } from './dto/claim-reward-by-user.req.dto';

@Controller()
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @MessagePattern('replaceEventReward')
  async replaceEventReward(
    @Payload() payload: UpdateEventRewardRequestDto,
  ): Promise<boolean> {
    await this.rewardService.replaceEventReward(payload);
    return true;
  }

  @MessagePattern('claimRewardByUser')
  async claimRewardByUser(
    @Payload() payload: ClaimRewardByUserRequestDto,
  ): Promise<boolean> {
    await this.rewardService.claimRewardByUser(payload.userId, payload.eventId);
    return true;
  }
}
