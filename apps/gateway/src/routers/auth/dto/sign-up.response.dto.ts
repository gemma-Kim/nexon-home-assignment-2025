import { ApiProperty } from '@nestjs/swagger';
import { AuthRole } from '../enums/auth.enum';

export class SignUpResponseUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: AuthRole })
  role: AuthRole;

  constructor(partial: Partial<SignUpResponseUser>) {
    Object.assign(this, partial);
  }
}

export class SignUpResponseDto {
  @ApiProperty({ type: SignUpResponseUser })
  user: SignUpResponseUser;

  constructor(partial: Partial<SignUpResponseDto>) {
    this.user = new SignUpResponseUser(partial.user);
  }
}
