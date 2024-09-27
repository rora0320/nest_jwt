import { Date } from 'mongoose';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

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
}
