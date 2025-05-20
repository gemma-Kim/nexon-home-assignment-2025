import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from './token.service';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { SignInResponseDto } from '../controllers/dto/sign-in.res.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  async signIn(email: string, password: string): Promise<SignInResponseDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 이메일입니다.');
    }

    const isPasswordMatch = await this.comparePassword(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const accessToken = this.tokenService.signToken(
      user._id,
      user.email,
      user.role,
    );

    const refreshToken = this.tokenService.signRefreshToken(user._id);
    await this.userRepository.updateRefreshToken(user._id, refreshToken);

    return new SignInResponseDto({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  }

  private async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
