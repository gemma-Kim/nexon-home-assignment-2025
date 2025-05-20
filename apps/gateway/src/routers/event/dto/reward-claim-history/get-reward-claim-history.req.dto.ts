import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsNumberString,
  IsString,
  IsOptional,
} from 'class-validator';
import { RewardClaimStatus } from '../../enums/reward-claim-history';

export class GetRewardClaimHistoryRequestDto {
  @ApiPropertyOptional({
    required: false,
    example: '1,2,3',
    description: '이벤트 아이디 리스트',
    type: [String],
    format: 'form', // Treat as comma-separated form-style query param in Swagger
  })
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value
      : typeof value === 'string'
      ? value.split(',').map((val) => val.trim())
      : [value],
  )
  eventId?: string[];

  @ApiPropertyOptional({
    required: false,
    example: '1,2,3',
    description: '유저 아이디 리스트',
    type: [String],
    format: 'form', // Treat as comma-separated form-style query param in Swagger
  })
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value
      : typeof value === 'string'
      ? value.split(',').map((val) => val.trim())
      : [value],
  )
  userId?: string[];

  @ApiPropertyOptional({
    required: false,
    description: '요청 이력 상태',
    example: 'SUCCESS,REQUESTED,FAILED (쉼표로 구분)',
    enum: [RewardClaimStatus],
    type: [RewardClaimStatus],
    format: 'form', // Treat as comma-separated form-style query param in Swagger
  })
  @IsOptional()
  @IsEnum(RewardClaimStatus, { each: true })
  @Transform(({ obj }) => {
    return obj.status
      ? Array.isArray(obj.status)
        ? obj.status
        : [obj.status]
      : [];
  })
  status?: RewardClaimStatus[];

  @ApiPropertyOptional({ description: '페이지 번호', default: 1 })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ description: '페이지당 항목 수', default: 10 })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional({
    example: 'createdAt',
    enum: ['createdAt', 'status', 'eventId'],
  })
  @IsOptional()
  @IsIn(['createdAt', 'status', 'eventId'])
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ example: 'desc', enum: ['asc', 'desc'] })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}
