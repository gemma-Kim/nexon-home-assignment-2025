import { EventDocument } from '../../../../infrastructure/database/schemas/event.schema';
import { EventDto } from '../../../../libs/common/dto/event.dto';
import { RewardMapper } from './reward.mapper';
import { EventConditionMapper } from './condition.mapper';
import { EventEntity } from '../../domain/entities/event.entity';

export class EventMapper {
  static toDomain(doc: EventDocument): EventEntity {
    return new EventEntity(
      doc._id.toString(),
      doc.name,
      doc.status,
      doc.startAt,
      doc.endAt,
      doc.conditions
        ? doc.conditions.map((c) => EventConditionMapper.toDomain(c))
        : [],
      doc.rewards ? doc.rewards.map((r) => RewardMapper.toDomain(r)) : [],
      doc.description,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  static toEntity(dto: EventDto): EventEntity {
    return new EventEntity(
      dto.id,
      dto.name,
      dto.status,
      new Date(dto.startAt),
      new Date(dto.endAt),
      dto?.conditions
        ? dto.conditions.map((c) => EventConditionMapper.toEntity(c))
        : [],
      dto?.rewards ? dto.rewards.map((r) => RewardMapper.toEntity(r)) : [],
      dto.description,
      dto?.createdAt ? new Date(dto.createdAt) : undefined,
      dto?.updatedAt ? new Date(dto.updatedAt) : undefined,
    );
  }

  static toDto(entity: EventEntity): EventDto {
    return new EventDto({
      id: entity.id,
      name: entity.getName(),
      description: entity.getDescription() || null,
      status: entity.getStatus(),
      startAt: entity.getStartAt().toISOString(),
      endAt: entity.getEndAt().toISOString(),
      createdAt: entity.createdAt?.toISOString(),
      updatedAt: entity.updatedAt?.toISOString(),
      conditions: entity
        .getConditions()
        .map((c) => EventConditionMapper.toDto(c)),
      rewards: entity.getRewards().map((r) => RewardMapper.toDto(r)),
    });
  }

  static toPersistence(entity: EventEntity): Record<string, any> {
    return {
      _id: entity.id,
      name: entity.getName(),
      description: entity.getDescription(),
      status: entity.getStatus(),
      startAt: entity.getStartAt(),
      endAt: entity.getEndAt(),
      conditions: entity
        .getConditions()
        .map((c) => EventConditionMapper.toPersistence(c)),
      rewards: entity.getRewards().map((r) => RewardMapper.toPersistence(r)),
      createdAt: entity.createdAt ?? new Date(),
      updatedAt: entity.updatedAt ?? new Date(),
    };
  }
}
