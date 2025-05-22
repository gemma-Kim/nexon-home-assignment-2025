import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UpdateEventRewardRequestDto } from '../controllers/dto/update-event-reward.req.dto';
import { EventService } from './event.service';
import { RewardRepository } from '../../infrastructure/repositories/reward.repository';
import { RewardClaimHistoryWriteService } from '../../../reward/application/sevices/reward-claim-history-write.service';
import { RewardClaimResultReason } from 'apps/event/src/infrastructure/database/enums/reward-claim-history.enum';
import { ConditionEvaluatorService } from './condition-evaluator.service';
import { EventEntity } from '../../domain/entities/event.entity';
import { RewardEventPublisher } from '../events/reward-event-publisher.interface';
import { RewardClaimHistoryReadService } from '../../../reward/application/sevices/reward-claim-history-read.service';
import { RewardGrantStateService } from '../../../reward/application/sevices/reward-grant-state.service';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class RewardService {
  constructor(
    @Inject('RewardRepository')
    private readonly rewardRepository: RewardRepository,
    private readonly eventService: EventService,
    private readonly rewardClaimHistoryWriteService: RewardClaimHistoryWriteService,
    private readonly rewardClaimHistoryReadService: RewardClaimHistoryReadService,
    private readonly conditionEvaluatorService: ConditionEvaluatorService,
    private readonly rewardGrantStateService: RewardGrantStateService,
    @Inject('RewardEventPublisher')
    private readonly rewardEventPublisher: RewardEventPublisher,
    @InjectConnection()
    private readonly conn: Connection,
  ) {}

  // TODO: race condition 해결하기
  async replaceEventReward(dto: UpdateEventRewardRequestDto): Promise<void> {
    const event = await this.eventService.findEventById(dto.eventId);
    event.isAvailiableUpdate();
    return await this.rewardRepository.updateRewardsByEventId(
      event.id,
      dto.rewards,
    );
  }

  async assertUserCanClaimReward(
    event: EventEntity,
    userId: string,
  ): Promise<boolean> {
    if (!event.isActive()) {
      const reason = RewardClaimResultReason.EVENT_STATUS;
      await this.rewardClaimHistoryWriteService.logFailedClaim(
        event.id,
        userId,
        event.getRewards(),
        reason,
      );
      throw new BadRequestException('진행중인 이벤트가 아닙니다.');
    }

    const ok = await this.conditionEvaluatorService.evaluateAll(
      userId,
      event.getConditions(),
    );

    if (!ok) {
      const reason = RewardClaimResultReason.CONDITION_NOT_MET;
      await this.rewardClaimHistoryWriteService.logFailedClaim(
        event.id,
        userId,
        event.getRewards(),
        reason,
      );
      throw new BadRequestException('조건을 충족하지 않습니다.');
    }

    // 중복 여부 검사
    const exists =
      await this.rewardClaimHistoryReadService.existSuccessOrRequestedHistory(
        userId,
        event.id,
      );

    if (exists) {
      await this.rewardClaimHistoryWriteService.logFailedClaim(
        event.id,
        userId,
        event.getRewards(),
        RewardClaimResultReason.DUPLICATED_CLAIM,
      );

      throw new ConflictException('이미 보상을 받은 이벤트입니다.');
    }

    return true;
  }

  // TODO: race condition 해결하기
  async claimRewardByUser(userId: string, eventId: string): Promise<void> {
    const event = await this.eventService.findEventById(eventId);
    await this.assertUserCanClaimReward(event, userId);

    const session = await this.conn.startSession();

    try {
      session.startTransaction();

      await this.rewardClaimHistoryWriteService.logRequestedClaim(
        eventId,
        userId,
        event.getRewards(),
        session,
      );

      await this.rewardGrantStateService.create(event, userId, session);

      await session.commitTransaction();

      // ✅ 보상 지급 요청 이벤트 발행 (비동기)
      await this.rewardEventPublisher.publishRewardClaimRequested({
        userId,
        eventId,
        rewards: event.getRewards().map((r) => ({
          type: r.type,
          value: r.value.toNumber(),
        })),
      });
    } catch (e) {
      try {
        await session.abortTransaction();
      } catch (abortErr) {
        console.error('❗ abortTransaction 실패:', abortErr);
      }

      console.error('❗ 트랜잭션 내부 오류 발생:', e);

      if (e.code === 11000) {
        throw new ConflictException('이미 보상 요청된 이벤트입니다.');
      }

      await this.rewardClaimHistoryWriteService.logFailedClaim(
        eventId,
        userId,
        event.getRewards(),
        RewardClaimResultReason.GRANT_FAILED,
      );

      throw new ConflictException('보상 지급 중 오류 발생');
    }
  }
}
