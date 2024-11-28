import {Controller,Get,Post,Put,Delete,Body,Param,Req,BadRequestException,NotFoundException,ForbiddenException,InternalServerErrorException,} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../../entities/usuario.entity';
import { Request } from 'express';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll(@Req() req: Request): Promise<Usuario[]> {
    try {
      const user = req['user'];
      if (user.rol !== 'super-admin') {
        throw new ForbiddenException(
          'Solo los super-administradores pueden acceder a esta ruta',
        );
      }

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
  async findOne(@Param('id') id: number, @Req() req: Request): Promise<Usuario> {
    try {
      const user = req['user'];

      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }

      // Validar permisos: super-admin, admin o el propio usuario
      if (user.rol === 'user' && user.id !== id) {
        throw new ForbiddenException(
          'No tienes permiso para ver la información de este usuario',
        );
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
  async create(
    @Body() usuarioData: Partial<Usuario>,
    @Req() req: Request,
  ): Promise<Usuario> {
    try {
      const user = req['user'];
      if (user.rol !== 'super-admin') {
        throw new ForbiddenException(
          'Solo los super-administradores pueden crear usuarios',
        );
      }

      if (!usuarioData.nombre || !usuarioData.email || !usuarioData.contrasena) {
        throw new BadRequestException(
          'Los campos nombre, email y contraseña son obligatorios',
        );
      }

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
    @Req() req: Request,
  ): Promise<void> {
    try {
      const user = req['user'];

      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }

      if (user.rol === 'user' && user.id !== id) {
        throw new ForbiddenException(
          'No tienes permiso para actualizar este usuario',
        );
      }

      const usuario = await this.usuarioService.findOne(id);
      if (!usuario) {
        throw new NotFoundException(`No se encontró el usuario con ID ${id}`);
      }

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
  async delete(@Param('id') id: number, @Req() req: Request): Promise<void> {
    try {
      const user = req['user'];

      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }

      if (user.rol !== 'super-admin') {
        throw new ForbiddenException(
          'Solo los super-administradores pueden eliminar usuarios',
        );
      }

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
