import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//@app/common으로 나오게 하려면 tscongif수정
import {DatabaseModule} from "@app/common/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
