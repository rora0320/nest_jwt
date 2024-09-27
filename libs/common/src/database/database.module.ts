import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  //스키마모델을 정의하는 정적 메서드
  // 지정된 모델을 몽구스에 등록해 모듈 전체에서 종속성을 주입할 수 있도록 하는 결과 반환
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
