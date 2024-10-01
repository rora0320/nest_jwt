import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    await this.validateCreateUser(createUserDto);
    return this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  private async validateCreateUser(createUserDto: CreateUserDto) {
    try {
      await this.userRepository.findOne({ email: createUserDto.email });
    } catch (e) {
      return;
    }
    throw new UnprocessableEntityException('email already exists');
  }

  // 로컬 전략 ->사용자 아이디 비밀번호를 받아서 user 있는지 확인하고
  async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const IsValidPassword = await bcrypt.compare(password, user.password);

    if (!IsValidPassword) {
      throw new UnauthorizedException('credential not valid 비번다를때');
    }
    return user;
  }

  // jwt 전략 -> 토큰 검증시 사용자 있는지 확인
  async getUser(getUserDto: GetUserDto) {
    return await this.userRepository.findOne(getUserDto);
  }
}
