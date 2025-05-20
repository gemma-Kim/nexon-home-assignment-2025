import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumberString, IsEnum } from 'class-validator';
import { EventStatus } from '../../enums/event.enum';

export class SearchEventsQueryRequestDto {
  @ApiProperty({
    required: false,
    example: '1,2,3',
    description: '이벤트 아이디 리스트',
    type: [String],
    format: 'form', // Treat as comma-separated form-style query param in Swagger
  })
  @IsString({ each: true })
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value
      : typeof value === 'string'
      ? value.split(',').map((val) => val.trim())
      : [value],
  )
  id?: string[];

  @ApiPropertyOptional({
    required: false,
    description: '이벤트 상태',
    example: 'READY,ACTIVE (쉼표로 구분)',
    type: [EventStatus],
    format: 'form', // Treat as comma-separated form-style query param in Swagger
  })
  @IsOptional()
  @IsEnum(EventStatus, { each: true }) // 👈 이것이 핵심
  @Transform(({ obj }) => {
    return obj.status
      ? Array.isArray(obj.status)
        ? obj.status
        : [obj.status]
      : [];
  })
  status?: string[];

  @ApiPropertyOptional({ description: '시작일 (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  startAt?: string;

  @ApiPropertyOptional({ description: '종료일 (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  endAt?: string;

  @ApiPropertyOptional({ description: '페이지 번호', default: 1 })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ description: '페이지당 항목 수', default: 10 })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}
