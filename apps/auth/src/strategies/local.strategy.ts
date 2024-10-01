import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../user/user.service';

@Injectable()
// 대부분의 전략을 passportStrategy 전략을 사용할 건데
export class LocalStrategy extends PassportStrategy(Strategy) {
  // 사용자 서비스에 엑세스 권한이 있어야함 권한
  constructor(private readonly userService: UserService) {
    // strategy 에서 넘겨줄 사용자이름을 확인할 필드를 지정
    super({ usernameField: 'email' });
  }

  // 로컬 전략으로 verifyUser 할건데
  async validate(email: string, password: string) {
    try {
      return await this.userService.verifyUser(email, password);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('왜달라?');
    }
  }
}
