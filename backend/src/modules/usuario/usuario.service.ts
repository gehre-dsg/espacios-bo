import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOneBy({ ci_usuario: id });
  }

  async create(usuario: Partial<Usuario>): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }

  async update(id: number, usuario: Partial<Usuario>): Promise<void> {
    await this.usuarioRepository.update(id, usuario);
  }
  
  async updatePartial(id: number, partialData: Partial<Usuario>): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ ci_usuario: id });

    if (!usuario) {
      throw new NotFoundException(`No se encontró el usuario con ID ${id}`);
    }

    // Validar `id_rol` si se proporciona
    if (partialData.id_rol && typeof partialData.id_rol !== 'number') {
      throw new BadRequestException('El campo id_rol debe ser un número válido');
    }

    // Actualizar solo los campos proporcionados
    Object.assign(usuario, partialData);

    return this.usuarioRepository.save(usuario);
  }

  async delete(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
