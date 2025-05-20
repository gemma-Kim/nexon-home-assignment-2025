import { Inject, Injectable } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import {
  RewardClaimResultReason,
  RewardClaimStatus,
} from 'apps/event/src/infrastructure/database/enums/reward-claim-history.enum';
import { RewardEntity } from '../../../event/domain/entities/reward.entity';
import { RewardClaimHistoryRepositoryPort } from '../../domain/ports/reward-claim-history.repository.port';

@Injectable()
export class RewardClaimHistoryWriteService {
  constructor(
    @Inject('RewardClaimHistoryRepository')
    private readonly rewardClaimHistoryRepository: RewardClaimHistoryRepositoryPort,
  ) {}

  async create(
    history: {
      eventId: string;
      userId: string;
      status: RewardClaimStatus;
      reason?: RewardClaimResultReason;
      rewards?: RewardEntity[];
    },
    session?: ClientSession,
  ): Promise<void> {
    await this.rewardClaimHistoryRepository.create(
      {
        ...history,
        rewards: history.rewards,
        eventId: history.eventId,
      },
      session,
    );
  }

  async logRequestedClaim(
    eventId: string,
    userId: string,
    rewards: RewardEntity[] = [],
    session?: ClientSession,
  ): Promise<void> {
    await this.create(
      {
        eventId,
        userId,
        rewards,
        status: RewardClaimStatus.REQUESTED,
        reason: RewardClaimResultReason.NONE,
      },
      session,
    );
  }

  async logSuccessClaim(
    eventId: string,
    userId: string,
    rewards: RewardEntity[] = [],
    session?: ClientSession,
  ): Promise<void> {
    await this.create(
      {
        eventId,
        userId,
        rewards,
        status: RewardClaimStatus.SUCCESS,
        reason: RewardClaimResultReason.NONE,
      },
      session,
    );
  }

  async logFailedClaim(
    eventId: string,
    userId: string,
    rewards: RewardEntity[] = [],
    reason?: RewardClaimResultReason,
    session?: ClientSession,
  ): Promise<void> {
    await this.create(
      {
        eventId,
        userId,
        status: RewardClaimStatus.FAILED,
        reason,
        rewards,
      },
      session,
    );
  }
}
