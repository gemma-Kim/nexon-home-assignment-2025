import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';
import { RewardController } from './controllers/reward.controller';
import { RewardService } from './services/reward.service';
import { RewardClaimHistoryService } from './services/reward-claim-history.service';
import { RewardClaimService } from './services/reward-claim.service';
import { RewardClaimHistoryController } from './controllers/reward-claim-history.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EVENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'event',
          port: 3000,
        },
      },
    ]),
  ],
  controllers: [
    EventController,
    RewardController,
    RewardClaimHistoryController,
  ],
  providers: [
    EventService,
    RewardService,
    RewardClaimService,
    RewardClaimHistoryService,
  ],
})
export class EventModule {}
