import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { UserDto } from '@app/common/dto/user.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationsRepository) {}
  async create(createReservationDto: CreateReservationDto, userId: string) {
    return await this.reservationRepository.create({
      ...createReservationDto,
      userId,
    });
  }

  async findAll() {
    return await this.reservationRepository.findAll({});
  }

  async findOne(id: string) {
    return await this.reservationRepository.findOne({ id });
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return await this.reservationRepository.findOneAndUpdate(
      { id },
      { $set: updateReservationDto },
    );
  }

  remove(id: string) {
    return `This action removes a #${id} reservation`;
  }
}
