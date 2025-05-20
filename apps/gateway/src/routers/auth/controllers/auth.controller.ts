import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AdminGuard } from '../../../authorization/guards/role/admin.guard';
import { SignInRequestDto } from '../dto/sign-in.request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInResponseDto } from '../dto/sign-in.response.dto';
import { SignUpRequestDto } from '../dto/sign-up.request.dto';
import { SignUpInternalRequestDto } from '../dto/sign-up-internal.request.dto';
import { SignUpResponseDto } from '../dto/sign-up.response.dto';
import { Public } from '@gateway/authorization/decorators/public.decorator';

@Controller('auth')
@ApiTags('인증')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signUp')
  @ApiOperation({
    summary: '일반 사용자 회원가입',
  })
  @ApiResponse({
    status: 200,
    type: SignUpResponseDto,
    description: '로그인 성공',
  })
  async signUp(@Body() payload: SignUpRequestDto): Promise<SignUpResponseDto> {
    return new SignUpResponseDto(await this.authService.signUp(payload));
  }

  // 임시 가드 해제
  // @UseGuards(AdminGuard)
  @Post('signUp/internal')
  @ApiOperation({
    summary: '관리자 사용자 등록',
    description: '어드민를 통해 관리자 계정(운영자, 감사자)를 등록합니다.',
  })
  @ApiResponse({
    status: 200,
    type: SignUpResponseDto,
    description: '로그인 성공',
  })
  async signUpInternal(
    @Body() payload: SignUpInternalRequestDto,
  ): Promise<SignUpResponseDto> {
    return new SignUpResponseDto(
      await this.authService.internalSignUp(payload),
    );
  }

  @Public()
  @Post('signIn')
  @ApiOperation({
    summary: '로그인',
  })
  @ApiResponse({
    status: 201,
    type: SignInResponseDto,
    description: '회원가입 성공',
  })
  async signIn(@Body() payload: SignInRequestDto): Promise<SignInResponseDto> {
    return new SignInResponseDto(await this.authService.signIn(payload));
  }
}
