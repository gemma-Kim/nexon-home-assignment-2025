import { Module } from '@nestjs/common';
import { AuthenticationService } from './application/services/authentication.service';
import { AuthenticationController } from './application/controllers/authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './application/services/token.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { DatabaseModule } from '../../infrastructure/database/database.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret_code', //TODO: env 로 빼기
      signOptions: { expiresIn: '5h' },
    }),
    DatabaseModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, TokenService, UserRepository],
  exports: [TokenService],
})
export class AuthenticationModule {}
