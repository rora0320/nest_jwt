import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  // 마이크로 서비스로 auth 서비스를 reservation에도 적용되도록 TCP를 통해
  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     host: 'localhost',
  //     // port: configService.get('TCP_PORT'),
  //   },
  // });

  // 쿠키에 대한 모든 요청은 미들웨어를 통해 실행
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);

  // 마이크로서비스 시작
  // await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
