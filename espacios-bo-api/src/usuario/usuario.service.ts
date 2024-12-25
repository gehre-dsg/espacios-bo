import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import * as argon2 from 'argon2';

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

  async insertOne(usuario: Partial<Usuario>) {
    const existingUsuario = await this.usuarioRepos.findOne({
      where: [
        { email: usuario.email },
        { ci: usuario.ci }
      ]
    });

    if (existingUsuario) {
      throw new ConflictException('Ya existe un usuario con el CI o email dados');
    }

    usuario.contrasena = await argon2.hash(usuario.contrasena);
    const usuarioEntity = this.usuarioRepos.create(usuario);
    return this.usuarioRepos.insert(usuarioEntity);
  }

  async updateOne(llave: string | number, usuario: Partial<Usuario>) {
    if (typeof llave === 'string') {
      const existingUsuario = await this.findOneEmail(llave);
      if (existingUsuario) {
        return this.usuarioRepos.update(existingUsuario.ci, usuario);
      }
    } else if (typeof llave === 'number') {
      const existingUsuario = await this.findOneCi(llave);
      if (existingUsuario) {
        return this.usuarioRepos.update(existingUsuario.ci, usuario);
      }
    } else {
      throw new Error('Llave invalida, debe ser una cadena o un numero');
    }
  }

  async deleteOne(llave: string | number) {
    if (typeof llave === 'string') {
      const existingUsuario = await this.findOneEmail(llave);
      if (existingUsuario) {
        return this.usuarioRepos.delete({ email: existingUsuario.email });
      }
    } else if (typeof llave === 'number') {
      const existingUsuario = await this.findOneCi(llave);
      if (existingUsuario) {
        return this.usuarioRepos.delete({ ci: existingUsuario.ci });
      }
    } else {
      throw new Error('Llave invalida, debe ser una cadena o un numero');
    }
  }
}
