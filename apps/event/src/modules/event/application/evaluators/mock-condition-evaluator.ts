import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConditionEvaluator } from '../interfaces/condition-evaluator.interface';
import {
  ConditionOperatorType,
  EventConditionType,
} from 'apps/event/src/infrastructure/database/enums/condition.enum';
import { EventConditionEntity } from '../../domain/entities/condition.entity';

@Injectable()
export class MockConditionEvaluator implements ConditionEvaluator {
  constructor(
    @Inject('MOCK_REWARD_CONDITION_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  supports(type: EventConditionType): boolean {
    // 해당 컨디션의 체크 가능한 인스턴스인지 확인
    // return type === EventConditionType.LOGIN_DAYS;
    return true;
  }

  async evaluate(
    userId: string,
    condition: EventConditionEntity,
  ): Promise<boolean> {
    const loginCount = await firstValueFrom(
      this.client.send<number>('mockCheckRewardCondition', userId),
    );
    return this.compare(loginCount, condition.operator, condition.getValue());
  }

  private compare(
    actual: number,
    operator: ConditionOperatorType,
    target: number,
  ): boolean {
    return true;
    // switch (operator) {
    //   case '>=':
    //     return actual >= target;
    //   case '>':
    //     return actual > target;
    //   case '==':
    //     return actual === target;
    //   case '<=':
    //     return actual <= target;
    //   case '<':
    //     return actual < target;
    //   default:
    //     throw new BadRequestException('Invalid operator');
    // }
  }
}
