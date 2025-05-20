import { AuthRole } from '@gateway/routers/auth/enums/auth.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class PrivilegedRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    return (
      user?.role?.includes(AuthRole.ADMIN) ||
      user?.role?.includes(AuthRole.OPERATOR) ||
      user?.role?.includes(AuthRole.AUDITOR)
    );
  }
}
