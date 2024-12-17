import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // Importar bcrypt para el hashing de contraseñas
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

  //para usar en el auth.service.ts
  async findByEmail(email: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ email });
    if (!usuario) {
      throw new NotFoundException(`No se encontró el usuario con el email ${email}`);
    }
    return usuario;
  }

  async create(usuario: Partial<Usuario>): Promise<Usuario> {
    // Generar el hash de la contraseña antes de guardar
    if (usuario.contrasena) {
      const salt = await bcrypt.genSalt();
      usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
    }
    return this.usuarioRepository.save(usuario);
  }

  async update(id: number, usuario: Partial<Usuario>): Promise<void> {
    // Hashear la contraseña si está presente
    if (usuario.contrasena) {
      const salt = await bcrypt.genSalt();
      usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
    }
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

    // Hashear la contraseña si está presente
    if (partialData.contrasena) {
      const salt = await bcrypt.genSalt();
      partialData.contrasena = await bcrypt.hash(partialData.contrasena, salt);
    }

    // Actualizar solo los campos proporcionados
    Object.assign(usuario, partialData);

    return this.usuarioRepository.save(usuario);
  }

  async delete(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
  
}
