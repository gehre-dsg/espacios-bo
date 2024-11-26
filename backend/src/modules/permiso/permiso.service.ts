import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from '../../entities/permiso.entity';

@Injectable()
export class PermisoService {
  constructor(
    @InjectRepository(Permiso)
    private permisoRepository: Repository<Permiso>,
  ) {}

  async findAll(): Promise<Permiso[]> {
    return this.permisoRepository.find();
  }

  async findOne(id: number): Promise<Permiso> {
    return this.permisoRepository.findOne({ where: { id } });
  }

  async create(permisoData: Partial<Permiso>): Promise<Permiso> {
    const newPermiso = this.permisoRepository.create(permisoData);
    return this.permisoRepository.save(newPermiso);
  }

  async update(id: number, permisoData: Partial<Permiso>): Promise<Permiso> {
    await this.permisoRepository.update(id, permisoData);
    return this.permisoRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.permisoRepository.delete(id);
  }
}
