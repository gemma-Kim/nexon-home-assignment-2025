import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  RewardClaimResultReason,
  RewardClaimStatus,
} from '../enums/reward-claim-history.enum';
import { RewardDocument, RewardSchema } from './reward.schema';

export type RewardClaimHistoryDocument = RewardClaimHistoryModel & Document;

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'rewardClaimHistory',
})
export class RewardClaimHistoryModel {
  readonly _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'event' })
  eventId: Types.ObjectId;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, enum: RewardClaimStatus, required: true })
  status: RewardClaimStatus;

  @Prop({ type: String, enum: RewardClaimResultReason, required: false })
  reason?: RewardClaimResultReason;

  @Prop({ type: [RewardSchema], default: [] })
  rewards?: RewardDocument[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const RewardClaimHistorySchema = SchemaFactory.createForClass(
  RewardClaimHistoryModel,
);

// REQUESTED만 유니크하게
RewardClaimHistorySchema.index(
  { userId: 1, eventId: 1, status: 1 }, // ✅ 키에 status 포함
  {
    unique: true,
    partialFilterExpression: { status: 'REQUESTED' },
  },
);
