import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common';
import { PrivilegedRoleGuard } from 'apps/gateway/src/authorization/guards';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterEventResponseDto } from '../dto/event/register-event.res.dto';
import { RewardClaimHistoryService } from '../services/reward-claim-history.service';
import { GetRewardClaimHistoryByUserRequestDto } from '../dto/reward-claim-history/get-reward-claim-history-by-user.req.dto';
import { GetRewardClaimHistoryByUserResponseDto } from '../dto/reward-claim-history/get-reward-claim-history-by-user.res.dto';
import { GetRewardClaimHistoryResponseDto } from '../dto/reward-claim-history/get-reward-claim-history.res.dto';
import { GetRewardClaimHistoryRequestDto } from '../dto/reward-claim-history/get-reward-claim-history.req.dto';
import { UserGuard } from '@gateway/authorization/guards/role/user.guard';

@ApiTags('보상 요청 이력')
@Controller('event')
export class RewardClaimHistoryController {
  constructor(private readonly eventService: RewardClaimHistoryService) {}

  @UseGuards(PrivilegedRoleGuard)
  @Get('reward/history')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '이벤트 보상 요청 이력 조회',
    description: '이벤트 보상 요청 이력을 조회합니다.',
  })
  @ApiResponse({
    status: 201,
    type: RegisterEventResponseDto, // TODO: res 정의하기
    description: '이벤트 보상 요청 이력을 조회 성공',
  })
  async getRewardClaimHistoryByPrivilegedUser(
    @Query() payload: GetRewardClaimHistoryRequestDto,
  ): Promise<GetRewardClaimHistoryResponseDto[]> {
    const result = await this.eventService.getRewardClaimHistory(payload);
    return result.map((r) => new GetRewardClaimHistoryResponseDto(r));
  }

  @UseGuards(UserGuard)
  @Get('reward/me/history')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '사용자 이벤트 보상 요청 이력 조회',
    description: '사용자가 이벤트 보상 요청 이력을 조회합니다.',
  })
  @ApiResponse({
    status: 201,
    type: RegisterEventResponseDto, // TODO: res 정의하기
    description: '사용자 이벤트 보상 요청 이력 조회 성공',
  })
  async getRewardClaimHistoryByUser(
    @Query() payload: GetRewardClaimHistoryByUserRequestDto,
    @Req() req,
  ): Promise<GetRewardClaimHistoryByUserResponseDto[]> {
    return await this.eventService.getRewardClaimHistory({
      ...payload,
      userId: [req.user.id],
    });
  }
}
