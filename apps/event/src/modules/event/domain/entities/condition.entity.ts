import {
  ConditionOperatorType,
  EventConditionType,
} from 'apps/event/src/infrastructure/database/enums/condition.enum';

export class EventConditionEntity {
  constructor(
    public readonly id: string,
    public readonly type: EventConditionType,
    public readonly operator: ConditionOperatorType,
    protected value: number,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
  ) {}

  updateValue(newValue: number) {
    if (newValue < 0) {
      throw new Error('조건 값은 0 이상이어야 합니다.');
    }
    this.value = newValue;
  }

  static validate(entity: EventConditionEntity): void {
    if (!entity.type || !entity.operator) {
      throw new Error('조건 타입과 연산자는 필수입니다.');
    }

    if (typeof entity.value !== 'number' || isNaN(entity.value)) {
      throw new Error('조건 값은 숫자여야 합니다.');
    }
  }

  getValue(): number {
    return this.value;
  }
}
