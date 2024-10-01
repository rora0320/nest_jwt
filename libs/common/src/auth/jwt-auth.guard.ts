import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable, tap, map } from 'rxjs';
import { AUTH_SERVICE } from '@app/common/constants/service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;

    console.log('여기 공통 auth 가드');
    if (!jwt) {
      return false;
    }

    //메시지 패턴이랑 같은 거 authenticate
    return this.authClient
      .send('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        // 마이크로 서비스에서 성공적으로 응답이 오면 참으로 반환하기
        map(() => true),
      );
  }
}
