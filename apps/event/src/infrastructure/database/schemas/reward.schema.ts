import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RewardType } from '../enums/reward.enum';

export type RewardDocument = RewardModel & Document;

@Schema({ _id: true, timestamps: true }) // embedded 용
export class RewardModel {
  readonly _id: Types.ObjectId;

  @Prop({ type: String, enum: RewardType, required: true })
  type: RewardType;

  @Prop({ type: Number, required: true })
  value: number;

  createdAt?: Date;

  updatedAt?: Date;
}

export const RewardSchema = SchemaFactory.createForClass(RewardModel);

// RewardSchema.index({ eventId: 1, type: 1 }, { unique: true });
