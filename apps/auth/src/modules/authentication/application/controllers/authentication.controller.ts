import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthenticationService } from '../services/authentication.service';
import { SignInRequestDto } from './dto/sign-in.req.dto';
import { SignInResponseDto } from './dto/sign-in.res.dto';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @MessagePattern('signIn')
  async signIn(
    @Payload() payload: SignInRequestDto,
  ): Promise<SignInResponseDto> {
    return await this.authenticationService.signIn(
      payload.email,
      payload.password,
    );
  }
}
