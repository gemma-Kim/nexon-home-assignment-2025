import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';
import { AuthRole } from '../enums/auth.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpInternalRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ enum: AuthRole })
  @IsIn([AuthRole.ADMIN, AuthRole.AUDITOR, AuthRole.OPERATOR])
  role: AuthRole;
}
