import { RewardClaimHistoryDocument } from 'apps/event/src/infrastructure/database/schemas/reward-claim-history.schem';
import { RewardClaimHistoryDto } from '../../../../libs/common/dto/reward-claim-history.dto';
import { RewardClaimHistoryEntity } from '../../domain/entities/reward-claim-history.entity';
import { RewardMapper } from '../../../event/infrastructure/mappers/reward.mapper';

export class RewardClaimHistoryMapper {
  static toDomain(doc: RewardClaimHistoryDocument): RewardClaimHistoryEntity {
    return new RewardClaimHistoryEntity(
      doc._id.toString(),
      doc.eventId.toString(),
      doc.userId,
      doc.status,
      doc.reason,
      (doc.rewards ?? []).map((r) => RewardMapper.toDomain(r)),
      doc.createdAt,
    );
  }

  static toEntity(dto: RewardClaimHistoryDto): RewardClaimHistoryEntity {
    return new RewardClaimHistoryEntity(
      dto.id,
      dto.eventId,
      dto.userId,
      dto.status,
      dto.reason,
      (dto.rewards ?? []).map((r) => RewardMapper.toEntity(r)),
      dto.createdAt ? new Date(dto.createdAt) : undefined,
    );
  }

  static toDto(entity: RewardClaimHistoryEntity): RewardClaimHistoryDto {
    return new RewardClaimHistoryDto({
      id: entity.id,
      eventId: entity.eventId,
      userId: entity.userId,
      status: entity.getStatus(),
      reason: entity.getReason(),
      rewards: entity.getRewards().map((r) => RewardMapper.toDto(r)),
      createdAt: entity.createdAt?.toISOString() ?? '',
    });
  }

  static toPersistence(entity: RewardClaimHistoryEntity): Record<string, any> {
    return {
      _id: entity.id,
      eventId: entity.eventId,
      userId: entity.userId,
      status: entity.getStatus(),
      reason: entity.getReason(),
      rewards: entity.getRewards().map((r) => RewardMapper.toPersistence(r)),
      createdAt: entity.createdAt ?? new Date(),
    };
  }
}
