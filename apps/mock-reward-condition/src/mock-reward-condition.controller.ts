import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MockRewardConditionController {
  private readonly logger = new Logger(MockRewardConditionController.name);

  @MessagePattern('mockCheckRewardCondition')
  async getLoginCount(@Payload() payload): Promise<number> {
    this.logger.log('✅ 리워드 조건 만족 여부 확인 완료');
    return 1;
  }
}
