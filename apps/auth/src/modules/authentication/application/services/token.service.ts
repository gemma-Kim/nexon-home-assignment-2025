import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  signToken(userId: string, email: string, role: string): string {
    const payload = { sub: userId, email: email, role: role };
    return this.jwtService.sign(payload);
  }

  signRefreshToken(userId: string): string {
    return this.jwtService.sign(
      { userId },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      },
    );
  }

  verifyRefreshToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.REFRESH_TOKEN_SECRET,
    });
  }
}
