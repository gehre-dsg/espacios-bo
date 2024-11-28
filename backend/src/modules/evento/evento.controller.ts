import {Controller,Get,Post,Delete,Param,Body,Req,BadRequestException,NotFoundException,ForbiddenException,InternalServerErrorException,} from '@nestjs/common';
import { EventoService } from './evento.service';
import { Evento } from '../../entities/evento.entity';
import { Request } from 'express';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Get()
  async findAll(@Req() req: Request): Promise<Evento[]> {
    try {
      const user = req['user'];

      // Validar roles
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para listar los eventos',
        );
      }

      const eventos = await this.eventoService.findAll();
      if (eventos.length === 0) {
        throw new NotFoundException('No se encontraron eventos');
      }
      return eventos;
    } catch (error) {
      console.error('Error al obtener los eventos:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener los eventos',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req: Request): Promise<Evento> {
    try {
      const user = req['user'];

      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }

      // Validar roles
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para consultar este evento',
        );
      }

      const evento = await this.eventoService.findOne(id);
      if (!evento) {
        throw new NotFoundException(`No se encontró el evento con ID ${id}`);
      }
      return evento;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(`Error al buscar el evento con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al buscar el evento con ID ${id}`,
      );
    }
  }

  @Post()
  async create(
    @Body()
    body: {
      id_reserva: number;
      id_tipo_evento: number;
      nombre: string;
      descripcion: string;
      fecha_evento: Date;
    },
    @Req() req: Request,
  ): Promise<Evento> {
    try {
      const user = req['user'];

      // Validar roles
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para crear un nuevo evento',
        );
      }

      // Validar campos obligatorios
      const { id_reserva, id_tipo_evento, nombre, descripcion, fecha_evento } = body;
      if (!id_reserva || !id_tipo_evento || !nombre || !fecha_evento) {
        throw new BadRequestException(
          'Los campos id_reserva, id_tipo_evento, nombre y fecha_evento son obligatorios',
        );
      }

      // Validar tipos de datos
      if (typeof id_reserva !== 'number' || typeof id_tipo_evento !== 'number') {
        throw new BadRequestException(
          'Los campos id_reserva y id_tipo_evento deben ser números',
        );
      }
      if (typeof nombre !== 'string' || typeof descripcion !== 'string') {
        throw new BadRequestException(
          'Los campos nombre y descripcion deben ser texto',
        );
      }
      if (isNaN(new Date(fecha_evento).getTime())) {
        throw new BadRequestException(
          'El campo fecha_evento debe ser una fecha válida',
        );
      }

      return await this.eventoService.create(body);
    } catch (error) {
      console.error('Error al crear el evento:', error);
      if (error.code === 'ER_NO_REFERENCED_ROW') {
        throw new BadRequestException(
          'La reserva o el tipo de evento referenciado no existe',
        );
      }
      throw new InternalServerErrorException(
        'Ocurrió un error al crear el evento',
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

      // Validar roles
      if (user.rol !== 'super-admin') {
        throw new ForbiddenException(
          'Solo los super-administradores pueden eliminar eventos',
        );
      }

      const evento = await this.eventoService.findOne(id);
      if (!evento) {
        throw new NotFoundException(`No se encontró el evento con ID ${id}`);
      }

      await this.eventoService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(`Error al eliminar el evento con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al eliminar el evento con ID ${id}`,
      );
    }
  }
}
