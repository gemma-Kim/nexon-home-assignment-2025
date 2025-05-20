import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty()
  @IsEmail({ message: '올바르지 않은 이메일 형식입니다.' })
  email: string;

  @ApiProperty()
  @IsString({ message: '유효하지 않는 패스워드입니다.' })
  password: string;
}
