import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RewardGrantStateRepositoryPort } from '../../domain/ports/reward-grant-state.repository.port';
import { EventEntity } from '../../../event/domain/entities/event.entity';
import { ClientSession } from 'mongoose';
import { RewardGrantStateEntity } from '../../domain/entities/reward-grant-state.entity';
import { RewardDto } from 'apps/event/src/libs/common/dto/reward.dto';
import { RewardMapper } from '../../../event/infrastructure/mappers/reward.mapper';

@Injectable()
export class RewardGrantStateService {
  constructor(
    @Inject('RewardGrantStateRepository')
    private readonly rewardGrantStateRepository: RewardGrantStateRepositoryPort,
  ) {}

  async create(
    event: EventEntity,
    userId: string,
    session?: ClientSession,
  ): Promise<RewardGrantStateEntity> {
    return await this.rewardGrantStateRepository.create(
      event.id,
      userId,
      event.getRewards(),
      [],
      session,
    );
  }

  async markAsGranted(
    eventId: string,
    userId: string,
    newGrantedRewards: RewardDto[],
    grantedAt: Date,
  ) {
    const state = await this.rewardGrantStateRepository.findByEventIdAndUserId(
      eventId,
      userId,
    );

    if (!state) {
      throw new NotFoundException('존재하지 않은 보상 지급 내역입니다.');
    }

    const merged = this.mergeRewards(
      state.grantedRewards.map(RewardMapper.toDto),
      newGrantedRewards,
    );

    const isFullyGranted = this.isFullyGranted(
      merged,
      state.requestedRewards.map(RewardMapper.toDto),
    );

    await this.rewardGrantStateRepository.updateGrantedRewards(
      state.id,
      merged.map(RewardMapper.toEntity),
      isFullyGranted,
      grantedAt,
    );

    if (isFullyGranted) {
      // TODO: reward claim history 의 상태를 SUCCESS 로 업데이트
    }
  }

  private mergeRewards(
    current: RewardDto[],
    incoming: RewardDto[],
  ): RewardDto[] {
    const byType = new Map<string, RewardDto>();
    [...current, ...incoming].forEach((r) => {
      byType.set(r.type, r); // 뒤의 값으로 덮어씀 (최신값 우선)
    });
    return Array.from(byType.values());
  }

  private isFullyGranted(
    granted: RewardDto[],
    requested: RewardDto[],
  ): boolean {
    const grantedTypes = new Set(granted.map((r) => r.type));
    const requestedTypes = new Set(requested.map((r) => r.type));

    if (grantedTypes.size !== requestedTypes.size) return false;

    for (const type of requestedTypes) {
      if (!grantedTypes.has(type)) return false;
    }
    return true;
  }
}
