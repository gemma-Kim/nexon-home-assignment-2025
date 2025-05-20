import { EventStatus } from '@event/infrastructure/database/enums/event.enum';
import { EventEntity } from '../entities/event.entity';

export interface SearchEventsQuery {
  id?: string[];
  status?: string[];
  startAt?: Date;
  endAt?: Date;
  page: number;
  limit: number;
}

export interface EventRepositoryPort {
  create(entity: EventEntity): Promise<EventEntity>;
  findById(id: string): Promise<EventEntity | null>;
  findMany(query: SearchEventsQuery): Promise<EventEntity[]>;
  updateStatusById(id: string, status: EventStatus): Promise<void>;
}
