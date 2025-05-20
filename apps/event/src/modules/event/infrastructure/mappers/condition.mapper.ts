import { EventCondtionDocument } from '../../../../infrastructure/database/schemas/condition.schema';
import { EventConditionDto } from '../../../../libs/common/dto/condition.dto';
import { EventConditionEntity } from '../../domain/entities/condition.entity';

export class EventConditionMapper {
  static toDomain(doc: EventCondtionDocument): EventConditionEntity {
    return new EventConditionEntity(
      doc._id.toString(),
      doc.type,
      doc.operator,
      doc.value,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  static toDto(entity: EventConditionEntity): EventConditionDto {
    return new EventConditionDto({
      id: entity.id,
      type: entity.type,
      operator: entity.operator,
      value: entity.getValue(),
    });
  }

  static toEntity(dto: EventConditionDto): EventConditionEntity {
    return new EventConditionEntity(dto.id, dto.type, dto.operator, dto.value);
  }

  static toPersistence(entity: EventConditionEntity): Record<string, any> {
    return {
      _id: entity.id,
      type: entity.type,
      operator: entity.operator,
      value: entity.getValue(),
      createdAt: entity.createdAt ?? new Date(),
      updatedAt: entity.updatedAt ?? new Date(),
    };
  }
}
