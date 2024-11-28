import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../../entities/usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll(): Promise<Usuario[]> {
    try {
      const usuarios = await this.usuarioService.findAll();
      if (usuarios.length === 0) {
        throw new NotFoundException('No se encontraron usuarios');
      }
      return usuarios;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener los usuarios',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Usuario> {
    try {
      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }
      const usuario = await this.usuarioService.findOne(id);
      if (!usuario) {
        throw new NotFoundException(`No se encontró el usuario con ID ${id}`);
      }
      return usuario;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(`Error al buscar el usuario con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al buscar el usuario con ID ${id}`,
      );
    }
  }

  @Post()
  async create(@Body() usuarioData: Partial<Usuario>): Promise<Usuario> {
    try {
      // Validar que los campos obligatorios estén presentes
      if (!usuarioData.nombre || !usuarioData.email || !usuarioData.contrasena) {
        throw new BadRequestException(
          'Los campos nombre, email y contraseña son obligatorios',
        );
      }

      // Validar que el rol sea válido
      if (usuarioData.id_rol && typeof usuarioData.id_rol !== 'number') {
        throw new BadRequestException('El campo id_rol debe ser un número válido');
      }

      return await this.usuarioService.create(usuarioData);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('El email ya está registrado');
      }
      console.error('Error al crear el usuario:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al crear el usuario',
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() usuarioData: Partial<Usuario>,
  ): Promise<void> {
    try {
      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }

      // Verificar si el usuario existe
      const usuario = await this.usuarioService.findOne(id);
      if (!usuario) {
        throw new NotFoundException(`No se encontró el usuario con ID ${id}`);
      }

      // Validar datos actualizados
      if (usuarioData.email && typeof usuarioData.email !== 'string') {
        throw new BadRequestException('El campo email debe ser un texto válido');
      }

      await this.usuarioService.update(id, usuarioData);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(`Error al actualizar el usuario con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al actualizar el usuario con ID ${id}`,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    try {
      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }

      // Verificar si el usuario existe
      const usuario = await this.usuarioService.findOne(id);
      if (!usuario) {
        throw new NotFoundException(`No se encontró el usuario con ID ${id}`);
      }

      await this.usuarioService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(`Error al eliminar el usuario con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al eliminar el usuario con ID ${id}`,
      );
    }
  }
}
