import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermisoEvento } from './permiso-evento.entity';

@Injectable()
export class PermisoEventoService {
  constructor(
    @InjectRepository(PermisoEvento)
    private readonly PermisoEventoRepository: Repository<PermisoEvento>,
  ) {}

  findAll(): Promise<PermisoEvento[]> {
    return this.PermisoEventoRepository.find({
      relations: ['evento', 'permiso'],
    });
  }

  findOne(id_evento: number, id_permiso: number): Promise<PermisoEvento> {
    return this.PermisoEventoRepository.findOne({
      where: { id_evento, id_permiso },
      relations: ['evento', 'permiso'],
    });
  }

  create(data: Partial<PermisoEvento>): Promise<PermisoEvento> {
    const nuevoPermisoEvento = this.PermisoEventoRepository.create(data);
    return this.PermisoEventoRepository.save(nuevoPermisoEvento);
  }

  async update(
    id_evento: number,
    id_permiso: number,
    data: Partial<PermisoEvento>,
  ): Promise<void> {
    await this.PermisoEventoRepository.update({ id_evento, id_permiso }, data);
  }

  async delete(id_evento: number, id_permiso: number): Promise<void> {
    await this.PermisoEventoRepository.delete({ id_evento, id_permiso });
  }
}
