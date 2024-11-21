import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventoPermiso } from '../../entities/evento_permiso.entity';
import { Evento } from '../../entities/evento.entity';
import { Permiso } from '../../entities/permiso.entity';

@Injectable()
export class EventoPermisoService {
  constructor(
    @InjectRepository(EventoPermiso)
    private readonly eventoPermisoRepository: Repository<EventoPermiso>,
  ) {}

  // Crear un nuevo EventoPermiso
  async create(
    id_evento: number,
    id_permiso: number,
    documento: Buffer,
  ): Promise<EventoPermiso> {
    const eventoPermiso = this.eventoPermisoRepository.create({
      id_evento,
      id_permiso,
      documento,
    });
    return this.eventoPermisoRepository.save(eventoPermiso);
  }

  // Obtener todos los registros
  async findAll(): Promise<EventoPermiso[]> {
    return this.eventoPermisoRepository.find({
      relations: ['evento', 'permiso'],
    });
  }

  // Obtener un registro específico
  async findOne(id_evento: number, id_permiso: number): Promise<EventoPermiso> {
    return this.eventoPermisoRepository.findOne({
      where: { id_evento, id_permiso },
      relations: ['evento', 'permiso'],
    });
  }

  // Actualizar un registro
  async update(
    id_evento: number,
    id_permiso: number,
    documento: Buffer,
  ): Promise<EventoPermiso> {
    const eventoPermiso = await this.findOne(id_evento, id_permiso);
    if (!eventoPermiso) {
      throw new Error('EventoPermiso no encontrado');
    }
    eventoPermiso.documento = documento;
    return this.eventoPermisoRepository.save(eventoPermiso);
  }

  // Eliminar un registro
  async remove(id_evento: number, id_permiso: number): Promise<void> {
    const eventoPermiso = await this.findOne(id_evento, id_permiso);
    if (!eventoPermiso) {
      throw new Error('EventoPermiso no encontrado');
    }
    await this.eventoPermisoRepository.remove(eventoPermiso);
  }
}