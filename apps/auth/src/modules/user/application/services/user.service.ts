import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { InternalSignUpRequestDto } from '../controllers/dto/internal-sign-up.req.dto';
import { SignUpRequestDto } from '../controllers/dto/sign-up.req.dto';
import { AuthRole } from '../../../authentication/application/enums/auth.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(dto: SignUpRequestDto) {
    const user = await this.createUser(
      dto.email,
      dto.name,
      dto.password,
      AuthRole.USER,
    );

    return {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async internalSingUp(dto: InternalSignUpRequestDto) {
    if (!this.isPrivilegedRole(dto.role)) {
      throw new BadRequestException('생성할 수 없는 사용자 타입니다.');
    }

    const user = await this.createUser(
      dto.email,
      dto.name,
      dto.password,
      dto.role,
    );

    return {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };
  }

  private async createUser(
    email: string,
    name: string,
    password: string,
    role: AuthRole,
  ) {
    this.isValidPassword(password);
    await this.isValidEmail(email);
    const hashedPassword = await this.hashPassword(password);

    return await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
      role,
    });
  }

  private isPrivilegedRole(role: AuthRole): boolean {
    return role !== AuthRole.USER;
  }

  private async isValidEmail(email: string): Promise<boolean> {
    const duplicatedUser = await this.userRepository.findByEmail(email);
    if (duplicatedUser) {
      throw new BadRequestException('이메일이 중복되었습니다');
    }
    return true;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private isValidPassword(password: string): boolean {
    if (password.length < 8)
      throw new BadRequestException('패스워드는 8자 이상이어야 합니다.');

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasLetter || !hasNumber) {
      throw new BadRequestException(
        '패스워드는 영문자와 숫자를 모두 포함해야 합니다.',
      );
    }
    return true;
  }
}
