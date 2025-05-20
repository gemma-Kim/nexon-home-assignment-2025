import { ApiProperty } from '@nestjs/swagger';
import { AuthRole } from '../enums/auth.enum';
// import { AuthRole } from 'apps/gateway/src/authorization/enums';

export class SignInResponseUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: AuthRole })
  role: AuthRole;

  constructor(partial: Partial<SignInResponseUser>) {
    Object.assign(this, partial);
  }
}

export class SignInResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty({ type: SignInResponseUser })
  user: SignInResponseUser;

  constructor(partial: Partial<SignInResponseDto>) {
    this.accessToken = partial.accessToken;
    this.refreshToken = partial.refreshToken;
    this.user = new SignInResponseUser(partial.user);
  }
}
