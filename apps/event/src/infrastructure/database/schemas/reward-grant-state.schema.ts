import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { RewardDocument, RewardSchema } from './reward.schema';

export type RewardGrantStateDocument = RewardGrantStateModel & Document;

@Schema({
  timestamps: true,
  collection: 'rewardGrantState',
})
export class RewardGrantStateModel {
  readonly _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, index: true })
  eventId: Types.ObjectId;

  @Prop({ type: String, required: true, index: true })
  userId: string;

  @Prop({ type: [RewardSchema], default: [] })
  requestedRewards: RewardDocument[];

  @Prop({ type: [RewardSchema], default: [] })
  grantedRewards: RewardDocument[];

  @Prop({ type: Boolean, default: false })
  isFullyGranted: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date;
}

export const RewardGrantStateSchema = SchemaFactory.createForClass(
  RewardGrantStateModel,
);

// 복합키 인덱스 설정
RewardGrantStateSchema.index({ userId: 1, eventId: 1 }, { unique: true });
