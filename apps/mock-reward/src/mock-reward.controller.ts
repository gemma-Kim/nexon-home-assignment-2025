import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class MockRewardController {
  private readonly logger = new Logger(MockRewardController.name);

  constructor(
    @Inject('EVENT_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  @EventPattern('mock.reward.claim')
  handleMockRewardClaim(
    @Payload()
    data: {
      userId: string;
      eventId: string;
      type: string;
      value: number;
    },
  ) {
    this.logger.log(
      `🎁 보상 지급 요청 수신 - userId=${data.userId}, eventId=${data.eventId}, type=${data.type}, value=${data.value}`,
    );

    // mock 보상 처리 로직 작성
    this.client.emit('reward.claim.granted', {
      userId: data.userId,
      eventId: data.eventId,
      rewards: [{ type: data.type, value: data.value }],
      grantedAt: new Date().toISOString(),
    });
  }
}
