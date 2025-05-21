import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot('mongodb://mongo:27017/auth?replicaSet=rs0', {
      //TODO: env 로 빼기
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000,
      },
      readConcern: { level: 'majority' },
    }),
  ],
  exports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class DatabaseModule {}
