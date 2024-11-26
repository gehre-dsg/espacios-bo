import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventoPermiso } from '../../entities/evento_permiso.entity';

@Injectable()
export class EventoPermisoService {
  constructor(
    @InjectRepository(EventoPermiso)
    private readonly eventoPermisoRepository: Repository<EventoPermiso>,
  ) {}

  findAll(): Promise<EventoPermiso[]> {
    return this.eventoPermisoRepository.find({
      relations: ['evento', 'permiso'], // Incluye las relaciones
    });
  }

  findOne(id_evento: number, id_permiso: number): Promise<EventoPermiso> {
    return this.eventoPermisoRepository.findOne({
      where: { id_evento, id_permiso },
      relations: ['evento', 'permiso'],
    });
  }

  create(data: Partial<EventoPermiso>): Promise<EventoPermiso> {
    const nuevoEventoPermiso = this.eventoPermisoRepository.create(data);
    return this.eventoPermisoRepository.save(nuevoEventoPermiso);
  }

  async update(
    id_evento: number,
    id_permiso: number,
    data: Partial<EventoPermiso>,
  ): Promise<void> {
    await this.eventoPermisoRepository.update({ id_evento, id_permiso }, data);
  }

  async delete(id_evento: number, id_permiso: number): Promise<void> {
    await this.eventoPermisoRepository.delete({ id_evento, id_permiso });
  }
}
