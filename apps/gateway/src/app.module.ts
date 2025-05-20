import { Module } from '@nestjs/common';
import { AuthModule } from './routers/auth/auth.module';
import { EventModule } from './routers/event/event.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './authorization/guards/jwt/jwt-auth.guard';

@Module({
  imports: [
    AuthModule,
    EventModule,
    AuthorizationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/gateway/.env'],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
