import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ConditionEvaluator } from '../interfaces/condition-evaluator.interface';
import { EventConditionEntity } from '../../domain/entities/condition.entity';

import { ModuleRef } from '@nestjs/core';
import { MockConditionEvaluator } from '../evaluators/mock-condition-evaluator';

@Injectable()
export class ConditionEvaluatorService implements OnModuleInit {
  private evaluators: ConditionEvaluator[] = [];

  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    this.evaluators = [
      this.moduleRef.get(MockConditionEvaluator, { strict: false }),
    ];
  }

  async evaluateAll(
    userId: string,
    conditions: EventConditionEntity[],
  ): Promise<boolean> {
    for (const condition of conditions) {
      const evaluator = this.evaluators.find((e) => e.supports(condition.type));
      if (!evaluator) {
        throw new BadRequestException(
          `지원되지 않는 조건 타입: ${condition.type}`,
        );
      }

      const passed = await evaluator.evaluate(userId, condition);
      if (!passed) return false;
    }
    return true;
  }
}
