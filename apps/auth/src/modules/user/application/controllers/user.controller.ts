import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from '../services/user.service';
import { SignUpRequestDto } from './dto/sign-up.req.dto';
import { InternalSignUpRequestDto } from './dto/internal-sign-up.req.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('signUp')
  signUp(@Payload() payload: SignUpRequestDto) {
    return this.userService.signUp(payload);
  }

  @MessagePattern('internalSignUp')
  internalSingUp(@Payload() payload: InternalSignUpRequestDto) {
    return this.userService.internalSingUp(payload);
  }
}
