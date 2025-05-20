import {
  BadRequestException,
  NotFoundException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { EventMapper } from '../../infrastructure/mappers/event.mapper';
import { EventDto } from '../../../../libs/common/dto/event.dto';
import { EventRepositoryPort } from '../../domain/ports/event.repository.port';
import { EventEntity } from '../../domain/entities/event.entity';
import { SearchEventsRequestDto } from '../controllers/dto/search-events.req.dto';
import { EventStatus } from '@event/infrastructure/database/enums/event.enum';

@Injectable()
export class EventService {
  constructor(
    @Inject('EventRepository')
    private readonly eventRepository: EventRepositoryPort,
  ) {}

  async findEventById(id: string): Promise<EventEntity> {
    if (!id) throw new BadRequestException('잘못된 이벤트 아이디 입나다.');

    const event = await this.eventRepository.findById(id);
    if (!event) throw new NotFoundException('존재하지 않는 이벤트 입니다.');

    return event;
  }

  async registerEvent(event: EventDto): Promise<EventDto> {
    const eventEntity = EventMapper.toEntity(event);
    EventEntity.validate(eventEntity);

    const createdEvent = await this.eventRepository.create(eventEntity);
    return EventMapper.toDto(createdEvent);
  }

  async replaceEventStatus(id: string, status: EventStatus): Promise<void> {
    const event = await this.findEventById(id);
    event.isAvailiableUpdate();
    await this.eventRepository.updateStatusById(id, status);
  }

  async searchEventDetail(id: string): Promise<EventDto> {
    const event = await this.findEventById(id);
    return EventMapper.toDto(event);
  }

  async searchEvents({
    id,
    status,
    startAt,
    endAt,
    page,
    limit,
  }: SearchEventsRequestDto): Promise<EventDto[]> {
    const events = await this.eventRepository.findMany({
      id,
      status,
      startAt,
      endAt,
      page,
      limit,
    });
    return events.map((e) => EventMapper.toDto(e));
  }
}
