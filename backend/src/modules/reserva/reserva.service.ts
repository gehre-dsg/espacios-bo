// reserva.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from '../../entities/reserva.entity';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
  ) {}

  async findAll(): Promise<Reserva[]> {
    return this.reservaRepository.find({ relations: ['ci_usuario', 'id_espacio_publico'] });
  }

  async findOne(id: number): Promise<Reserva> {
    return this.reservaRepository.findOne({
      where: { id },
      relations: ['ci_usuario', 'id_espacio_publico'],
    });
  }

  async create(reserva: Partial<Reserva>): Promise<Reserva> {
    return this.reservaRepository.save(reserva);
  }

  async update(id: number, reserva: Partial<Reserva>): Promise<void> {
    await this.reservaRepository.update(id, reserva);
  }

  async delete(id: number): Promise<void> {
    await this.reservaRepository.delete(id);
  }
}
