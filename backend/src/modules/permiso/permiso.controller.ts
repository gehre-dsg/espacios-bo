import {Controller,Get,Post,Param,Body,Put,Delete,Req,BadRequestException,NotFoundException,ForbiddenException,InternalServerErrorException,} from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { Permiso } from '../../entities/permiso.entity';
import { Request } from 'express';

@Controller('permisos')
export class PermisoController {
  constructor(private readonly permisoService: PermisoService) {}

  @Get()
  async findAll(@Req() req: Request): Promise<Permiso[]> {
    try {
      const user = req['user'];

      // Validar rol
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para listar los permisos',
        );
      }

      const permisos = await this.permisoService.findAll();
      if (permisos.length === 0) {
        throw new NotFoundException('No se encontraron permisos registrados');
      }
      return permisos;
    } catch (error) {
      console.error('Error al obtener permisos:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener los permisos',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req: Request): Promise<Permiso> {
    try {
      const user = req['user'];

      // Validar rol
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para consultar este permiso',
        );
      }

      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }
      const permiso = await this.permisoService.findOne(id);
      if (!permiso) {
        throw new NotFoundException(`No se encontró el permiso con ID ${id}`);
      }
      return permiso;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(`Error al buscar el permiso con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al buscar el permiso con ID ${id}`,
      );
    }
  }

  @Post()
  async create(
    @Body() body: { nombre_permiso: string },
    @Req() req: Request,
  ): Promise<Permiso> {
    try {
      const user = req['user'];

      // Validar rol
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para crear un nuevo permiso',
        );
      }

      // Validar el campo obligatorio
      if (!body.nombre_permiso || typeof body.nombre_permiso !== 'string') {
        throw new BadRequestException(
          'El campo nombre_permiso es obligatorio y debe ser una cadena de texto',
        );
      }

      return await this.permisoService.create({
        nombre_permiso: body.nombre_permiso,
      });
    } catch (error) {
      console.error('Error al crear el permiso:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al registrar el permiso',
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { nombre_permiso: string },
    @Req() req: Request,
  ): Promise<Permiso> {
    try {
      const user = req['user'];

      // Validar rol
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para actualizar este permiso',
        );
      }

      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }

      const permiso = await this.permisoService.findOne(id);
      if (!permiso) {
        throw new NotFoundException(`No se encontró el permiso con ID ${id}`);
      }

      if (!body.nombre_permiso || typeof body.nombre_permiso !== 'string') {
        throw new BadRequestException(
          'El campo nombre_permiso es obligatorio y debe ser una cadena de texto',
        );
      }

      return await this.permisoService.update(id, {
        nombre_permiso: body.nombre_permiso,
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(`Error al actualizar el permiso con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al actualizar el permiso con ID ${id}`,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req: Request): Promise<void> {
    try {
      const user = req['user'];

      // Validar rol
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para eliminar este permiso',
        );
      }

      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }

      const permiso = await this.permisoService.findOne(id);
      if (!permiso) {
        throw new NotFoundException(`No se encontró el permiso con ID ${id}`);
      }

      await this.permisoService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(`Error al eliminar el permiso con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al eliminar el permiso con ID ${id}`,
      );
    }
  }
}
