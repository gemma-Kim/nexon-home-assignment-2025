import {
  ConditionOperatorType,
  EventConditionType,
} from 'apps/event/src/infrastructure/database/enums/condition.enum';
import {} from 'apps/event/src/infrastructure/database/enums/event.enum';

export class EventConditionDto {
  readonly id: string;
  readonly type: EventConditionType;
  readonly operator: ConditionOperatorType;
  readonly value: number;

  constructor(props: EventConditionDto) {
    this.id = props.id;
    this.type = props.type;
    this.operator = props.operator;
    this.value = props.value;
  }
}
