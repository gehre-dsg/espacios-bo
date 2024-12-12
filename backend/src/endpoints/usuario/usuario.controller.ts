import {Controller,Get,Post,Put,Patch,Delete,Body,Param,BadRequestException,NotFoundException,InternalServerErrorException, ForbiddenException, UnauthorizedException, Req,} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { Rol } from '../rol/rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    @InjectRepository(Rol)
    private readonly roleRepository: Repository<Rol>,
  ) {}

  @Get()
  async findAll(@Req() req: Request): Promise<Usuario[]> {
    try {
      const user = req['user'];
      if (!user) {
        throw new UnauthorizedException('Usuario no autenticado');
      }

      // Validar que solo admin o super-admin puedan ver todos los usuarios
      if (user.rol !== 'admin' && user.rol !== 'super-admin') {
        throw new ForbiddenException('No tienes permiso para acceder a esta ruta');
      }

      const usuarios = await this.usuarioService.findAll();
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
      console.error(`Error al buscar el usuario con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al buscar el usuario con ID ${id}`,
      );
    }
  }

  @Post()
async create(@Body() usuarioData: Partial<Usuario>): Promise<Usuario> {
  try {
    if (!usuarioData.email || !usuarioData.contrasena) {
      throw new BadRequestException(
        'Los campos email y contraseña son obligatorios',
      );
    }

    if (usuarioData.id_rol && typeof usuarioData.id_rol !== 'number') {
      throw new BadRequestException('El campo id_rol debe ser un número válido');
    }

    usuarioData.nombre = usuarioData.nombre || 'Usuario temporal';
    usuarioData.ap_paterno = usuarioData.ap_paterno || 'Apellido temporal';
    usuarioData.ap_materno = usuarioData.ap_materno || 'Apellido temporal';
    usuarioData.direccion = usuarioData.direccion || 'Sin dirección';
    usuarioData.telefono = usuarioData.telefono || 'Sin teléfono';
    if (!usuarioData.id_rol) {
      usuarioData.id_rol = 3;
    }

    return await this.usuarioService.create(usuarioData);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new BadRequestException('El email o CI ya está registrado');
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

      const usuario = await this.usuarioService.findOne(id);
      if (!usuario) {
        throw new NotFoundException(`No se encontró el usuario con ID ${id}`);
      }

      if (usuarioData.email && typeof usuarioData.email !== 'string') {
        throw new BadRequestException('El campo email debe ser un texto válido');
      }

      await this.usuarioService.update(id, usuarioData);
    } catch (error) {
      console.error(`Error al actualizar el usuario con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al actualizar el usuario con ID ${id}`,
      );
    }
  }

  @Patch(':id')
  async updatePartial(
    @Param('id') id: number,
    @Body() partialData: Partial<Usuario>,
  ): Promise<Usuario> {
    try {
      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }

      const updatedUser = await this.usuarioService.updatePartial(id, partialData);
      return updatedUser;
    } catch (error) {
      console.error(`Error al actualizar parcialmente el usuario con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al actualizar parcialmente el usuario con ID ${id}`,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    try {
      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }

      const usuario = await this.usuarioService.findOne(id);
      if (!usuario) {
        throw new NotFoundException(`No se encontró el usuario con ID ${id}`);
      }

      await this.usuarioService.delete(id);
    } catch (error) {
      console.error(`Error al eliminar el usuario con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al eliminar el usuario con ID ${id}`,
      );
    }
  }
}
