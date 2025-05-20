import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from '../../enums/reward.enum';
import { IsArray, IsEnum, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ReplaceRewardDto {
  @ApiProperty({
    required: true,
    description: '이벤트 보상 타입',
    enum: RewardType,
    type: RewardType,
    format: 'form',
  })
  @IsEnum(RewardType)
  type: RewardType;

  @ApiProperty({
    required: true,
    description: '이벤트 보상 값',
    type: Number,
    format: 'form',
  })
  @IsNumber()
  value: number;
}

export class ReplaceRewardRequestDto {
  @ApiProperty({
    required: true,
    description: '이벤트 상태',
    type: [ReplaceRewardDto],
    format: 'form',
  })
  @ValidateNested({ each: true })
  @Type(() => ReplaceRewardDto)
  @IsArray()
  rewards: ReplaceRewardDto[] = [];
}
