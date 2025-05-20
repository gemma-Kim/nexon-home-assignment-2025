import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  Patch,
} from '@nestjs/common';
import { EventService } from '../services/event.service';
import {
  AdminOrOperatorGuard,
  PrivilegedRoleGuard,
} from 'apps/gateway/src/authorization/guards';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterEventRequestDto } from '../dto/event/register-event.req.dto';
import { RegisterEventResponseDto } from '../dto/event/register-event.res.dto';
import { SearchEventsQueryRequestDto } from '../dto/event/search-events-query.req.dto';

@ApiTags('이벤트')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(PrivilegedRoleGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '이벤트 등록',
    description: '관리자가 이벤트를 등록합니다.',
  })
  @ApiResponse({
    status: 201,
    type: RegisterEventResponseDto,
    description: '이벤트 등록 성공',
  })
  async registerEvent(
    @Body() payload: RegisterEventRequestDto,
  ): Promise<RegisterEventResponseDto> {
    return new RegisterEventResponseDto(
      await this.eventService.registerEvent(payload),
    );
  }

  @UseGuards(AdminOrOperatorGuard)
  @Patch(':eventId/status')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '이벤트 상태 변경',
    description: '관리자, 운영자에 의해 준비 상태의 이벤트 상태를 변경합니다.',
  })
  @ApiResponse({
    status: 200,
    type: RegisterEventResponseDto,
    description: '이벤트 상태를 변경 성공',
  })
  async replaceEventStatus(
    @Param('eventId') eventId: string,
    @Body() payload,
  ): Promise<boolean> {
    await this.eventService.replaceEventStatus(eventId, payload.status);
    return true;
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '이벤트 조회',
  })
  async searchEvents(@Query() payload: SearchEventsQueryRequestDto) {
    return this.eventService.searchEvents(payload);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '단건 이벤트 상세정보 조회',
  })
  searchEventDetail(@Param('id') id: string) {
    return this.eventService.searchEventDetail(id);
  }
}
