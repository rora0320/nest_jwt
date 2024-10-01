import { Injectable } from '@nestjs/common';
import { UserDocument } from './user/model/user.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from './strategies/token-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  // 로컬전략 -> verifyUser -> user 의 id만 가지고 token 생성
  async login(user: UserDocument, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    // 만료일 설정
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    // 토큰 생성
    const token = this.jwtService.sign(tokenPayload);

    // 응답 쿠키에 넣어
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
