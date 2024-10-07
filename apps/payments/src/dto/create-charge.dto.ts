import { CardDto } from '@app/common/dto/card.dto';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateChargeDto {
  //여기서 정의할거야
  @IsDefined()
  //비어있지않은 객체이고
  @IsNotEmptyObject()
  //중첩 검증할거고
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;

  @IsNumber()
  amount: number;
}
