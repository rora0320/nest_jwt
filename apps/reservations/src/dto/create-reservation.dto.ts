import { Date } from 'mongoose';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateChargeDto } from '../../../payments/src/dto/create-charge.dto';

export class CreateReservationDto {
  /**
   * @IsDate() 데이터 타입이 유효한지 검사해 줌
   */
  /**
   * @Type(() => Date) 데이터 타입 안맞는 오류 때문에 transformer 가 데이터 타입을 맞춰줌
   */
  @IsDate()
  @Type(() => Date)
  timestamp: Date;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  userId: string;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;

  //여기서 정의할거야
  @IsDefined()
  //비어있지않은 객체이고
  @IsNotEmptyObject()
  //중첩 검증할거고
  @ValidateNested()
  // 타입을 반환하면 오류가 발생했을때 뭐가 부족한지 알기 쉬움
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
