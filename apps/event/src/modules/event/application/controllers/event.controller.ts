import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { EventService } from '../services/event.service';
import { SearchEventsRequestDto } from './dto/search-events.req.dto';
import { EventDto } from '@event/libs/common/dto/event.dto';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern('registerEvent')
  async registerEvent(@Payload() payload): Promise<EventDto> {
    return await this.eventService.registerEvent(payload);
  }

  @MessagePattern('replaceEventStatus')
  async replaceEventStatus(@Payload() payload): Promise<boolean> {
    await this.eventService.replaceEventStatus(payload.eventId, payload.status);
    return true;
  }

  @MessagePattern('searchEvents')
  searchEvents(
    @Payload() payload: SearchEventsRequestDto,
  ): Promise<EventDto[]> {
    return this.eventService.searchEvents(payload);
  }

  @MessagePattern('searchEventDetail')
  async searchEventDetail(@Payload() payload): Promise<EventDto> {
    return await this.eventService.searchEventDetail(payload.id);
  }
}
