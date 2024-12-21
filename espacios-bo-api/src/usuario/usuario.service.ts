import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepos: Repository<Usuario>
  ) { }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepos.find();
  }

  async findOneEmail(mail: string): Promise<Usuario> {
    return await this.usuarioRepos.findOne({ where: { email: mail } });
  }

  async findOneCi(ci: number): Promise<Usuario> {
    return await this.usuarioRepos.findOne({ where: { ci: ci } });
  }
}
