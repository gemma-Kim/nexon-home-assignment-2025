import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ConditionOperatorType,
  EventConditionType,
} from '../../enums/condtion.enum';
import { RewardType } from '../../enums/reward.enum';

export class RegisterEventConditionDto {
  @ApiProperty({
    enum: EventConditionType,
    example: EventConditionType.INVITE_FRIENDS,
  })
  @IsEnum(EventConditionType)
  type: EventConditionType;

  @ApiProperty({ example: ConditionOperatorType.EQUAL })
  @IsEnum(ConditionOperatorType)
  operator: ConditionOperatorType;

  @ApiProperty({ example: 3 })
  @IsNumber()
  value: number;
}

export class RegisterEventRewardDto {
  @ApiProperty({ enum: RewardType, example: RewardType.POINT })
  @IsEnum(RewardType)
  type: RewardType;

  @ApiProperty({ type: Number, example: 1000 })
  @IsNumber()
  value: number;
}

export class RegisterEventRequestDto {
  @ApiProperty({ example: '친구 초대 이벤트' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '친구 3명 초대 시 1000포인트 지급', type: String })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2025-05-15T00:00:00Z' })
  @IsDateString()
  startAt: string;

  @ApiProperty({ example: '2025-06-01T00:00:00Z' })
  @IsDateString()
  endAt: string;

  @ApiProperty({ type: [RegisterEventConditionDto] })
  @ValidateNested({ each: true })
  @Type(() => RegisterEventConditionDto)
  @IsArray()
  conditions: RegisterEventConditionDto[];

  @ApiProperty({ type: [RegisterEventRewardDto] })
  @ValidateNested({ each: true })
  @Type(() => RegisterEventRewardDto)
  @IsArray()
  rewards: RegisterEventRewardDto[];
}
