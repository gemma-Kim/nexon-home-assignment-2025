import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SearchEventsQueryRequestDto } from '../dto/event/search-events-query.req.dto';
import { RegisterEventRequestDto } from '../dto/event/register-event.req.dto';
import { EventStatus } from '../enums/event.enum';

@Injectable()
export class EventService {
  @Inject('EVENT_SERVICE') private client: ClientProxy;

  async registerEvent(dto: RegisterEventRequestDto): Promise<Object> {
    return await firstValueFrom(this.client.send('registerEvent', dto));
  }

  async replaceEventStatus(
    eventId: string,
    status: EventStatus,
  ): Promise<boolean> {
    return await firstValueFrom(
      this.client.send('replaceEventStatus', { eventId, status }),
    );
  }

  async searchEvents(dto: SearchEventsQueryRequestDto): Promise<Object> {
    return await firstValueFrom(this.client.send('searchEvents', dto));
  }

  async searchEventDetail(id: string): Promise<Object> {
    return await firstValueFrom(this.client.send('searchEventDetail', { id }));
  }
}
