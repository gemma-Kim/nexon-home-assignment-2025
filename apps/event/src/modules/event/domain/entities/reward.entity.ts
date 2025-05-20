import { RewardType } from 'apps/event/src/infrastructure/database/enums/reward.enum';
import { RewardValue } from '../value-objects/reward-value.vo';
import { BadRequestException } from '@nestjs/common';

export class RewardEntity {
  private constructor(
    readonly id: string,
    readonly type: RewardType,
    readonly value: RewardValue,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
  ) {}

  static create(props: {
    id: string;
    type: RewardType;
    value: number;
    createdAt?: Date;
    updatedAt?: Date;
  }): RewardEntity {
    if (!Object.values(RewardType).includes(props.type)) {
      throw new BadRequestException('유효하지 않은 보상 타입입니다.');
    }

    if (props.value <= 0) {
      throw new BadRequestException('보상 값은 0보다 커야 합니다.');
    }

    return new RewardEntity(
      props.id,
      props.type,
      new RewardValue(props.value),
      props.createdAt,
      props.updatedAt,
    );
  }
}
