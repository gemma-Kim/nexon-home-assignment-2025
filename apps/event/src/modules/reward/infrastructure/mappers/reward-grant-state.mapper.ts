import { RewardGrantStateDocument } from '../../../../infrastructure/database/schemas/reward-grant-state.schema';
import { RewardGrantStateEntity } from '../../domain/entities/reward-grant-state.entity';
import { RewardGrantStateDto } from '../../../../libs/common/dto/reward-grant-state.dto';
import { RewardMapper } from '../../../event/infrastructure/mappers/reward.mapper';

export class RewardGrantStateMapper {
  static toDomain(doc: RewardGrantStateDocument): RewardGrantStateEntity {
    return new RewardGrantStateEntity({
      id: doc._id.toString(),
      eventId: doc.eventId.toString(),
      userId: doc.userId,
      requestedRewards: doc.requestedRewards.map(RewardMapper.toDomain),
      grantedRewards: doc.grantedRewards.map(RewardMapper.toDomain),
      isFullyGranted: doc.isFullyGranted,
      createdAt: doc?.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  static toDto(entity: RewardGrantStateEntity): RewardGrantStateDto {
    return new RewardGrantStateDto({
      id: entity.id,
      eventId: entity.eventId,
      userId: entity.userId,
      requestedRewards: entity.requestedRewards.map(RewardMapper.toDto),
      grantedRewards: entity.grantedRewards.map(RewardMapper.toDto),
      isFullyGranted: entity.isFullyGranted,
      createdAt: entity.createdAt?.toISOString(),
      updatedAt: entity.updatedAt?.toISOString(),
    });
  }

  static toPersistence(entity: RewardGrantStateEntity): Record<string, any> {
    return {
      _id: entity.id,
      eventId: entity.eventId,
      userId: entity.userId,
      requestedRewards: entity.requestedRewards.map(RewardMapper.toPersistence),
      grantedRewards: entity.grantedRewards.map(RewardMapper.toPersistence),
      isFullyGranted: entity.isFullyGranted,
      createdAt: entity.createdAt ?? new Date(),
      updatedAt: entity.updatedAt ?? new Date(),
    };
  }
}
