import { Module } from '@nestjs/common';
import {
  PrivilegedRoleGuard,
  AdminOrOperatorGuard,
  AdminGuard,
} from './guards';
import { AuditorGuard } from './guards/role/auditor.guard';
import { OperatorGuard } from './guards/role/operator.guard';
import { UserGuard } from './guards/role/user.guard';
import { JwtAuthGuard } from './guards/jwt/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    AdminGuard,
    AuditorGuard,
    UserGuard,
    OperatorGuard,
    PrivilegedRoleGuard,
    AdminOrOperatorGuard,
  ],
  exports: [
    JwtStrategy,
    JwtAuthGuard,
    AdminGuard,
    AuditorGuard,
    UserGuard,
    OperatorGuard,
    PrivilegedRoleGuard,
    AdminOrOperatorGuard,
  ],
})
export class AuthorizationModule {}
