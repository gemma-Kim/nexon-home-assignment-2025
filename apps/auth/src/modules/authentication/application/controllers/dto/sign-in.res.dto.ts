import { AuthRole } from '../../enums/auth.enum';

export class SignInResponseDto {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: AuthRole;
  };

  constructor(props: SignInResponseDto) {
    Object.assign(this, props);
  }
}
