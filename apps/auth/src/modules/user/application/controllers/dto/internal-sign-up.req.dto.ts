import { AuthRole } from 'apps/auth/src/modules/authentication/application/enums/auth.enum';

export class InternalSignUpRequestDto {
  email: string;
  password: string;
  name: string;
  role: AuthRole;
}
