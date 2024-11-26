import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from '../../entities/empresa.entity';
import { Usuario } from '../../entities/usuario.entity';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Empresa[]> {
    return this.empresaRepository.find({ relations: ['ci_usuario'] });
  }

  async findOne(id: number): Promise<Empresa> {
    return this.empresaRepository.findOne({ where: { id }, relations: ['ci_usuario'] });
  }

  async create(empresa: Partial<Empresa>): Promise<Empresa> {
    const newEmpresa = this.empresaRepository.create(empresa);
    return this.empresaRepository.save(newEmpresa);
  }
}
