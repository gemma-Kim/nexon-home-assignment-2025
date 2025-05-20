import { ApiProperty } from '@nestjs/swagger';
import { EventConditionType } from '../../enums/condtion.enum';
import { RewardType } from '../../enums/reward.enum';

export class EventConditionResponseDto {
  @ApiProperty({ enum: EventConditionType })
  type: EventConditionType;

  @ApiProperty()
  operator: string;

  @ApiProperty()
  value: number;

  constructor(partial: Partial<EventConditionResponseDto>) {
    Object.assign(this, partial);
  }
}

export class EventRewardResponseDto {
  @ApiProperty({ enum: RewardType })
  type: RewardType;

  @ApiProperty()
  value: number;

  constructor(partial: Partial<EventRewardResponseDto>) {
    Object.assign(this, partial);
  }
}

export class RegisterEventResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  startAt: string;

  @ApiProperty()
  endAt: string;

  @ApiProperty({ type: [EventConditionResponseDto] })
  conditions: EventConditionResponseDto[];

  @ApiProperty({ type: [EventRewardResponseDto] })
  rewards: EventRewardResponseDto[];

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  constructor(partial: Partial<RegisterEventResponseDto>) {
    Object.assign(this, partial);
    this.conditions = partial.conditions.map(
      (c) => new EventConditionResponseDto(c),
    );
    this.rewards = partial.rewards.map((r) => new EventRewardResponseDto(r));
  }
}
