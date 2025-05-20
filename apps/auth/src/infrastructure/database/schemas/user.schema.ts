import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuthRole } from '../../../modules/authentication/application/enums/auth.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'user' })
export class User {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, enum: AuthRole, required: true })
  role: AuthRole;

  // @Prop({ default: null }) // ✅ 리프레시 토큰 저장용
  // refreshToken: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
