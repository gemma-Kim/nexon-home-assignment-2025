import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  User,
  UserDocument,
} from 'apps/auth/src/infrastructure/database/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email });
  }

  async updateRefreshToken(id: string, hashedToken: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, {
      refreshToken: hashedToken,
    });
  }
}
