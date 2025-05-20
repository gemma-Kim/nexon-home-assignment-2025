import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  ConditionOperatorType,
  EventConditionType,
} from '../enums/condition.enum';

export type EventCondtionDocument = EventCondtionModel & Document;

@Schema({ _id: true, timestamps: true }) // embedded 용
export class EventCondtionModel {
  readonly _id: Types.ObjectId;

  @Prop({ type: String, enum: EventConditionType, required: true })
  type: EventConditionType;

  @Prop({ type: String, enum: ConditionOperatorType, required: true })
  operator: ConditionOperatorType;

  @Prop({ type: Number, required: true })
  value: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export const EventCondtionSchema =
  SchemaFactory.createForClass(EventCondtionModel);
