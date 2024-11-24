import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PresidenteOtb } from '../../entities/presidente_otb.entity';
import { Usuario } from '../../entities/usuario.entity';

@Injectable()
export class PresidenteOtbService {
  constructor(
    @InjectRepository(PresidenteOtb)
    private presidenteOtbRepository: Repository<PresidenteOtb>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<PresidenteOtb[]> {
    return this.presidenteOtbRepository.find({ relations: ['ci_usuario'] });
  }

  async findOne(id: number): Promise<PresidenteOtb> {
    return this.presidenteOtbRepository.findOne({
      where: { id },
      relations: ['ci_usuario'],
    });
  }

  async findUsuarioByCi(ci_usuario: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { ci_usuario } });
  }

  async create(presidenteOtbData: Partial<PresidenteOtb>): Promise<PresidenteOtb> {
    const newPresidenteOtb = this.presidenteOtbRepository.create({
      ci_usuario: presidenteOtbData.ci_usuario,  // Aquí pasamos el objeto Usuario
      otb: presidenteOtbData.otb,
      documento: presidenteOtbData.documento,
    });

    return this.presidenteOtbRepository.save(newPresidenteOtb);
  }

  async delete(id: number): Promise<void> {
    await this.presidenteOtbRepository.delete(id);
  }
}
