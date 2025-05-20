import { BadRequestException } from '@nestjs/common';

export class RewardValue {
  constructor(readonly amount: number) {
    if (amount <= 0) {
      throw new BadRequestException('Reward value must be positive');
    }
  }

  static of(amount: number): RewardValue {
    return new RewardValue(amount);
  }

  toNumber(): number {
    return this.amount;
  }
}
