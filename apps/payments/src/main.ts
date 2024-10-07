import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);

  const configService = app.get(ConfigService);

  // 마이크로 서비스로 auth 서비스를 payment 에도 적용되도록 TCP를 통해
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('PORT'),
    },
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  // await app.listen(3000);
}
bootstrap();
