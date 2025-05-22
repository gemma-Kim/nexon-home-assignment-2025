import { Module } from '@nestjs/common';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    RoleModule,
    DatabaseModule,
    MongooseModule.forRoot(
      'mongodb://mongo:27017/auth?replicaSet=rs0&directConnection=true',
      {
        //TODO: env 로 빼기
        useNewUrlParser: true,
        useUnifiedTopology: true,
        writeConcern: {
          w: 'majority',
          j: true,
          wtimeout: 1000,
        },
        readConcern: { level: 'majority' },
      },
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/auth/.env'], // 이 앱만 해당
    }),
  ],
})
export class AppModule {}
