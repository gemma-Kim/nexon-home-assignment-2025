import { AuthRole } from '@gateway/routers/auth/enums/auth.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminOrOperatorGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return (
      user?.role?.includes(AuthRole.ADMIN) ||
      user?.role?.includes(AuthRole.OPERATOR)
    );
  }
}
