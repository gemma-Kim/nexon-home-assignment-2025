import { Module } from '@nestjs/common';
import { UserController } from './application/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { UserRepository } from './repositories/user.repository';
import { DatabaseModule } from '../../infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
