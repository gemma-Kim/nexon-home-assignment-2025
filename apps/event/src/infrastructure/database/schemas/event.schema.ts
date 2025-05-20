import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EventStatus } from '../enums/event.enum';
import { RewardDocument, RewardSchema } from './reward.schema';
import { EventCondtionDocument, EventCondtionSchema } from './condition.schema';

export type EventDocument = EventModel & Document;

@Schema({ timestamps: true, collection: 'event' })
export class EventModel {
  readonly _id: Types.ObjectId;

  @Prop({
    type: String,
    enum: EventStatus,
    required: true,
    default: EventStatus.READY,
  })
  status: EventStatus;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  @Prop({
    type: [EventCondtionSchema],
    default: [],
  })
  conditions: EventCondtionDocument[];

  @Prop({ type: [RewardSchema], default: [] })
  rewards: RewardDocument[];

  createdAt?: Date;

  updatedAt?: Date;
}

export const EventSchema = SchemaFactory.createForClass(EventModel);
