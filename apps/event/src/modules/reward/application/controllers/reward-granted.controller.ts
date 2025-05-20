import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RewardGrantStateService } from 'apps/event/src/modules/reward/application/sevices/reward-grant-state.service';
import { RewardGrantedEvent } from './dto/reward-granted-event.dto';

@Controller()
export class RewardGrantedController {
  private readonly logger = new Logger(RewardGrantedController.name);

  constructor(
    private readonly rewardGrantStateService: RewardGrantStateService,
  ) {}

  @EventPattern('reward.claim.granted')
  async handleRewardGranted(@Payload() data: RewardGrantedEvent) {
    this.logger.log(
      `🎯 보상 완료 이벤트 수신: userId=${data.userId}, eventId=${data.eventId}`,
    );

    try {
      await this.rewardGrantStateService.markAsGranted(
        data.eventId,
        data.userId,
        data.rewards,
        new Date(data.grantedAt),
      );

      this.logger.log('✅ 보상 지급 상태 업데이트 완료');
    } catch (err) {
      this.logger.error('❌ 보상 처리 중 오류 발생', err);
    }
  }
}
