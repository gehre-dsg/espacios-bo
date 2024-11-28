import {Controller,Get,Post,Put,Delete,Body,Param,Req,BadRequestException,NotFoundException,ForbiddenException,InternalServerErrorException,} from '@nestjs/common';
import { EventoPermisoService } from './evento-permiso.service';
import { EventoPermiso } from '../../entities/evento_permiso.entity';
import { Request } from 'express';

@Controller('eventos-permisos')
export class EventoPermisoController {
  constructor(private readonly eventoPermisoService: EventoPermisoService) {}

  @Get()
  async findAll(@Req() req: Request): Promise<EventoPermiso[]> {
    try {
      const user = req['user'];

      // Validar rol
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para listar los eventos-permisos',
        );
      }

      const eventosPermisos = await this.eventoPermisoService.findAll();
      if (eventosPermisos.length === 0) {
        throw new NotFoundException('No se encontraron eventos-permisos registrados');
      }
      return eventosPermisos;
    } catch (error) {
      console.error('Error al obtener eventos-permisos:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener los eventos-permisos',
      );
    }
  }

  @Get(':id_evento/:id_permiso')
  async findOne(
    @Param('id_evento') id_evento: number,
    @Param('id_permiso') id_permiso: number,
    @Req() req: Request,
  ): Promise<EventoPermiso> {
    try {
      const user = req['user'];

      // Validar rol
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para consultar este evento-permiso',
        );
      }

      if (isNaN(id_evento) || isNaN(id_permiso)) {
        throw new BadRequestException('Los IDs proporcionados no son válidos');
      }
      const eventoPermiso = await this.eventoPermisoService.findOne(id_evento, id_permiso);
      if (!eventoPermiso) {
        throw new NotFoundException(
          `No se encontró el evento-permiso con ID Evento ${id_evento} y ID Permiso ${id_permiso}`,
        );
      }
      return eventoPermiso;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(`Error al buscar el evento-permiso con IDs (${id_evento}, ${id_permiso}):`, error);
      throw new InternalServerErrorException(
        `Error al buscar el evento-permiso con IDs (${id_evento}, ${id_permiso})`,
      );
    }
  }

  @Post()
  async create(
    @Body('id_evento') id_evento: number,
    @Body('id_permiso') id_permiso: number,
    @Body('documento') documento: Buffer,
    @Req() req: Request,
  ): Promise<EventoPermiso> {
    try {
      const user = req['user'];

      // Validar rol
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para crear un evento-permiso',
        );
      }

      if (!id_evento || !id_permiso || !documento) {
        throw new BadRequestException(
          'Los campos id_evento, id_permiso y documento son obligatorios',
        );
      }

      return await this.eventoPermisoService.create({ id_evento, id_permiso, documento });
    } catch (error) {
      console.error('Error al crear el evento-permiso:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al registrar el evento-permiso',
      );
    }
  }

  @Put(':id_evento/:id_permiso')
  async update(
    @Param('id_evento') id_evento: number,
    @Param('id_permiso') id_permiso: number,
    @Body() data: Partial<EventoPermiso>,
    @Req() req: Request,
  ): Promise<void> {
    try {
      const user = req['user'];

      // Validar rol
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para actualizar este evento-permiso',
        );
      }

      if (isNaN(id_evento) || isNaN(id_permiso)) {
        throw new BadRequestException('Los IDs proporcionados no son válidos');
      }

      const eventoPermiso = await this.eventoPermisoService.findOne(id_evento, id_permiso);
      if (!eventoPermiso) {
        throw new NotFoundException(
          `No se encontró el evento-permiso con ID Evento ${id_evento} y ID Permiso ${id_permiso}`,
        );
      }

      if (!data.documento) {
        throw new BadRequestException('El campo documento es obligatorio');
      }

      await this.eventoPermisoService.update(id_evento, id_permiso, { documento: data.documento });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(
        `Error al actualizar el evento-permiso con IDs (${id_evento}, ${id_permiso}):`,
        error,
      );
      throw new InternalServerErrorException(
        `Error al actualizar el evento-permiso con IDs (${id_evento}, ${id_permiso})`,
      );
    }
  }

  @Delete(':id_evento/:id_permiso')
  async delete(
    @Param('id_evento') id_evento: number,
    @Param('id_permiso') id_permiso: number,
    @Req() req: Request,
  ): Promise<void> {
    try {
      const user = req['user'];

      // Validar rol
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para eliminar este evento-permiso',
        );
      }

      if (isNaN(id_evento) || isNaN(id_permiso)) {
        throw new BadRequestException('Los IDs proporcionados no son válidos');
      }

      const eventoPermiso = await this.eventoPermisoService.findOne(id_evento, id_permiso);
      if (!eventoPermiso) {
        throw new NotFoundException(
          `No se encontró el evento-permiso con ID Evento ${id_evento} y ID Permiso ${id_permiso}`,
        );
      }

      await this.eventoPermisoService.delete(id_evento, id_permiso);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(
        `Error al eliminar el evento-permiso con IDs (${id_evento}, ${id_permiso}):`,
        error,
      );
      throw new InternalServerErrorException(
        `Error al eliminar el evento-permiso con IDs (${id_evento}, ${id_permiso})`,
      );
    }
  }
}
