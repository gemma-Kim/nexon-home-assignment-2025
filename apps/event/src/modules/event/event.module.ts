import { Module } from '@nestjs/common';
import { EventController } from './application/controllers/event.controller';
import { EventService } from './application/services/event.service';
import { EventRepository } from './infrastructure/repositories/event.repository';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { RewardRepository } from './infrastructure/repositories/reward.repository';
import { RewardController } from './application/controllers/reward.contoller';
import { RewardService } from './application/services/reward.service';
import { RewardModule } from '../reward/reward.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventEmitterRewardPublisher } from './application/events/publishers/event-emitter-reward.publisher';
import { RewardClaimListener } from './application/events/listeners/reward-claims.listener';
import { MockConditionEvaluator } from './application/evaluators/mock-condition-evaluator';
import { ConditionEvaluatorService } from './application/services/condition-evaluator.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [EventController, RewardController],
  imports: [
    DatabaseModule,
    RewardModule,
    EventEmitterModule.forRoot(),
    ClientsModule.register([
      {
        name: 'MOCK_REWARD_CONDITION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'mock-reward-condition', // TODO: 제출 시 변경하기 -> mock-reward-condition
          port: 3000,
        },
      },
      {
        name: 'MOCK_REWARD_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'mock-reward', // TODO: 제출 시 변경하기 -> mock-reward
          port: 3000,
        },
      },
    ]),
  ],
  providers: [
    EventService,
    RewardService,
    MockConditionEvaluator,
    ConditionEvaluatorService,
    RewardClaimListener,
    {
      provide: 'EventRepository',
      useClass: EventRepository,
    },
    {
      provide: 'RewardRepository',
      useClass: RewardRepository,
    },
    {
      provide: 'RewardEventPublisher',
      useClass: EventEmitterRewardPublisher,
    },
  ],
})
export class EventModule {}
