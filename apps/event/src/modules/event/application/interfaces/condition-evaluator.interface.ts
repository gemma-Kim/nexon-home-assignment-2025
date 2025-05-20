import { EventConditionType } from '../../../../infrastructure/database/enums/condition.enum';
import { EventConditionEntity } from '../../domain/entities/condition.entity';

export interface ConditionEvaluator {
  supports(type: EventConditionType): boolean;
  evaluate(userId: string, condition: EventConditionEntity): Promise<boolean>;
}
