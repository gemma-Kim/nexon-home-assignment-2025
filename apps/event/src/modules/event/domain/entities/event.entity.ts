import { EventStatus } from 'apps/event/src/infrastructure/database/enums/event.enum';
import { RewardEntity } from './reward.entity';
import { BadRequestException } from '@nestjs/common';
import { EventConditionEntity } from './condition.entity';

export class EventEntity {
  constructor(
    readonly id: string,
    protected name: string,
    protected status: EventStatus,
    protected startAt: Date,
    protected endAt: Date,
    protected conditions: EventConditionEntity[] = [],
    protected rewards: RewardEntity[] = [],
    protected description?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
  ) {}

  static validate(entity: EventEntity) {
    const now = new Date();

    if (!entity.isValidName()) {
      throw new BadRequestException('이벤트 이름은 3자 이상이어야 합니다.');
    }

    if (entity.startAt >= now) {
      throw new BadRequestException(
        '이벤트 시작일은 현재 시간보다 미래여야 합니다.',
      );
    }

    if (entity.endAt <= entity.startAt) {
      throw new BadRequestException(
        '이벤트 종료일은 시작일보다 이후여야 합니다.',
      );
    }
  }

  isAvailiableUpdate(): void {
    if (this.status !== EventStatus.READY) {
      throw new BadRequestException('이벤트 변경할 수 있는 상태가 아닙니다.');
    }
  }

  isValidName(): boolean {
    return !(!this.name || this.name.trim().length < 3);
  }

  isActive(): boolean {
    return this.status === EventStatus.ACTIVE;
  }

  isEnded(): boolean {
    return this.status === EventStatus.END || new Date() > this.endAt;
  }

  getName(): string {
    return this.name;
  }

  getStatus(): EventStatus {
    return this.status;
  }

  getStartAt(): Date {
    return this.startAt;
  }

  getEndAt(): Date {
    return this.endAt;
  }

  getConditions(): EventConditionEntity[] {
    return this.conditions;
  }

  getRewards(): RewardEntity[] {
    return this.rewards;
  }

  getDescription(): string | undefined {
    return this.description;
  }
}
