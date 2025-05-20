import { Module } from '@nestjs/common';
import { RewardClaimHistoryReadService } from './application/sevices/reward-claim-history-read.service';
import { RewardClaimHistoryController } from './application/controllers/reward-claim-history.controller';
import { RewardClaimHistoryWriteService } from './application/sevices/reward-claim-history-write.service';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { RewardClaimHistoryRepository } from './infrastructure/repositories/reward-claim-history.repository';
import { RewardGrantStateService } from './application/sevices/reward-grant-state.service';
import { RewardGrantStateRepository } from './infrastructure/repositories/reward-grant-state.repository';
import { RewardGrantedController } from './application/controllers/reward-granted.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [DatabaseModule, EventEmitterModule.forRoot()],
  controllers: [RewardClaimHistoryController, RewardGrantedController],
  providers: [
    RewardClaimHistoryReadService,
    RewardClaimHistoryWriteService,
    RewardGrantStateService,
    {
      provide: 'RewardClaimHistoryRepository',
      useClass: RewardClaimHistoryRepository,
    },
    {
      provide: 'RewardGrantStateRepository',
      useClass: RewardGrantStateRepository,
    },
  ],
  exports: [
    RewardClaimHistoryReadService,
    RewardClaimHistoryWriteService,
    RewardGrantStateService,
  ],
})
export class RewardModule {}
