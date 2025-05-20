import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  Req,
} from '@nestjs/common';
import { AdminOrOperatorGuard } from 'apps/gateway/src/authorization/guards';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterEventResponseDto } from '../dto/event/register-event.res.dto';
import { RewardService } from '../services/reward.service';
import { ReplaceRewardRequestDto } from '../dto/reward/claim-reward-by-user.req.dto';
import { UserGuard } from '@gateway/authorization/guards/role/user.guard';

@ApiTags('보상')
@Controller('event')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @UseGuards(AdminOrOperatorGuard)
  @Patch(':eventId/reward')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '이벤트 보상 변경',
    description: '관리자, 운영자에 의해 이벤트 보상을 변경합니다.',
  })
  @ApiResponse({
    status: 201,
    type: RegisterEventResponseDto,
    description: '이벤트 보상 변경 성공',
  })
  async replaceEventReward(
    @Param('eventId') eventId: string,
    @Body() payload: ReplaceRewardRequestDto,
  ): Promise<boolean> {
    await this.rewardService.replaceEventReward(eventId, payload);
    return true;
  }

  @UseGuards(UserGuard)
  @Post(':eventId/reward-claims')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '사용자 이벤트 보상 요청',
    description: '사용자가 이벤트의 보상을 요청합니다.',
  })
  @ApiResponse({
    status: 201,
    type: RegisterEventResponseDto,
    description: '사용자 이벤트 보상 성공',
  })
  async claimReward(
    @Param('eventId') eventId: string,
    @Req() req,
  ): Promise<boolean> {
    await this.rewardService.claimRewardByUser(req.user.id, eventId);
    return true;
  }
}
