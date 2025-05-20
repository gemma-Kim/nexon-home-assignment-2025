import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import {
  EventModel,
  EventDocument,
} from 'apps/event/src/infrastructure/database/schemas/event.schema';
import { FilterQuery, Model } from 'mongoose';
import { EventMapper } from '../mappers/event.mapper';
import { EventEntity } from '../../domain/entities/event.entity';
import {
  EventRepositoryPort,
  SearchEventsQuery,
} from '../../domain/ports/event.repository.port';
import { EventStatus } from '@event/infrastructure/database/enums/event.enum';

@Injectable()
export class EventRepository implements EventRepositoryPort {
  constructor(
    @InjectModel(EventModel.name)
    private readonly model: Model<EventDocument>,
  ) {}

  async create(entity: EventEntity): Promise<EventEntity> {
    const model = new this.model(EventMapper.toPersistence(entity));
    const document = await this.model.create(model);
    return EventMapper.toDomain(document);
  }

  async findById(id: string): Promise<EventEntity | null> {
    // TODO: 유틸로 분리하기
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('유효하지 않은 이벤트 아이디 입니다.');
    }
    const event = await this.model.findById(new ObjectId(id));
    return event ? EventMapper.toDomain(event) : null;
  }

  async findMany(query: SearchEventsQuery): Promise<EventEntity[]> {
    const filter: FilterQuery<EventDocument> = {};

    if (query?.id?.length) {
      // TODO: 유틸로 분리하기
      const validIds = query.id
        .filter((id) => ObjectId.isValid(id))
        .map((i) => new ObjectId(i));

      filter._id = {
        $in: validIds,
      };
    }

    if (query.status?.length) {
      filter.status = { $in: query.status };
    }

    if (query.startAt) {
      filter.startAt = {
        ...(filter.startAt ?? {}),
        $gte: new Date(query.startAt),
      };
    }
    if (query.endAt) {
      filter.endAt = { ...(filter.endAt ?? {}), $lte: new Date(query.endAt) };
    }

    const page = query.page;
    const limit = query.limit;
    const skip = page * limit;

    const result = await this.model
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return result.map(EventMapper.toDomain);
  }

  async updateStatusById(id: string, status: EventStatus): Promise<void> {
    await this.model.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          status,
        },
      },
    );
  }
}
