import { RewardDocument } from '../../../../infrastructure/database/schemas/reward.schema';
import { RewardDto } from '../../../../libs/common/dto/reward.dto';
import { RewardEntity } from '../../domain/entities/reward.entity';

export class RewardMapper {
  static toDomain(doc: RewardDocument): RewardEntity {
    return RewardEntity.create({
      id: doc._id.toString(),
      type: doc.type,
      value: doc.value,
      createdAt: doc?.createdAt,
      updatedAt: doc?.updatedAt,
    });
  }

  static toEntity(dto: RewardDto): RewardEntity {
    return RewardEntity.create({
      id: dto.id,
      type: dto.type,
      value: dto.value,
      createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
      updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
    });
  }

  static toDto(entity: RewardEntity): RewardDto {
    return new RewardDto({
      id: entity.id,
      type: entity.type,
      value: entity.value.amount,
      createdAt: entity.createdAt?.toISOString(),
      updatedAt: entity.updatedAt?.toISOString(),
    });
  }

  static toPersistence(entity: RewardEntity): Record<string, any> {
    return {
      _id: entity?.id,
      type: entity.type,
      value: entity.value.amount,
      createdAt: entity.createdAt ?? new Date(),
      updatedAt: entity.updatedAt ?? new Date(),
    };
  }
}
