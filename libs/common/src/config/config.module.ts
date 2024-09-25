import { Module } from '@nestjs/common';
import {ConfigModule as NestConfigModule, ConfigService} from "@nestjs/config";
import * as Joi from "joi";
@Module({
    // 구성모듈을 추상화하고 nest모듈에 래핑하는 이유: 확장성, 여러 환경에대한 구성 관리 쉬움. 주입,접근 용이
    imports:[NestConfigModule.forRoot({
        validationSchema:Joi.object({
            MONGODB_URI : Joi.string(),
        }),
        envFilePath:'.env',
        isGlobal:true,
    })],
    providers:[ConfigService],
    exports:[ConfigService],
})
export class ConfigModule {}
