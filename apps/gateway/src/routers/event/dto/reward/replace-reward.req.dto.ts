import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RewardType } from '../../enums/reward.enum';

export class ReplaceRewardDto {
  @IsEnum(RewardType)
  type: RewardType;

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
