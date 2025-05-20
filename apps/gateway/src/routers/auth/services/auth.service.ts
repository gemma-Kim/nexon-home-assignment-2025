import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SignInRequestDto } from '../dto/sign-in.request.dto';
import { SignUpInternalRequestDto } from '../dto/sign-up-internal.request.dto';
import { SignUpRequestDto } from '../dto/sign-up.request.dto';

@Injectable()
export class AuthService {
  @Inject('AUTH_SERVICE') private readonly client: ClientProxy;

  async signUp(dto: SignUpRequestDto): Promise<Object> {
    return await firstValueFrom(this.client.send('signUp', dto));
  }

  async internalSignUp(dto: SignUpInternalRequestDto): Promise<Object> {
    return await firstValueFrom(this.client.send('internalSignUp', dto));
  }

  async signIn(dto: SignInRequestDto): Promise<Object> {
    return await firstValueFrom(this.client.send('signIn', dto));
  }
}
