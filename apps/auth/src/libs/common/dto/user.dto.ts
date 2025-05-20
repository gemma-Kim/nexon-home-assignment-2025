import { AuthRole } from 'apps/auth/src/modules/authentication/application/enums/auth.enum';

export class UserDto {
  id: string;
  name: string;
  role: AuthRole;
}
