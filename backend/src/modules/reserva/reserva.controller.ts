import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { Reserva } from '../../entities/reserva.entity';
import { Request } from 'express';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Get()
  async findAll(@Req() req: Request): Promise<Reserva[]> {
    try {
      const user = req['user'];
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para listar las reservas',
        );
      }

      const reservas = await this.reservaService.findAll();
      if (reservas.length === 0) {
        throw new NotFoundException('No se encontraron reservas');
      }

      return reservas;
    } catch (error) {
      console.error('Error al obtener reservas:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener las reservas',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req: Request): Promise<Reserva> {
    try {
      const user = req['user'];
      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }

      const reserva = await this.reservaService.findOne(id);
      if (!reserva) {
        throw new NotFoundException(`No se encontró la reserva con ID ${id}`);
      }

      if (user.rol !== 'super-admin' && user.rol !== 'admin' && user.id !== reserva.ci_usuario) {
        throw new ForbiddenException('No tienes permiso para ver esta reserva');
      }

      return reserva;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(`Error al buscar la reserva con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al buscar la reserva con ID ${id}`,
      );
    }
  }

  @Post()
  async create(@Body() reservaData: Partial<Reserva>, @Req() req: Request): Promise<Reserva> {
    try {
      const user = req['user'];
      if (!user) {
        throw new ForbiddenException('Debes estar autenticado para crear una reserva');
      }

      if (!reservaData.fecha || !reservaData.hora_inicio || !reservaData.hora_fin) {
        throw new BadRequestException(
          'Los campos fecha, hora_inicio y hora_fin son obligatorios',
        );
      }

      reservaData.ci_usuario = user.id; // Asignar el usuario autenticado
      return await this.reservaService.create(reservaData);
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al crear la reserva',
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() reservaData: Partial<Reserva>,
    @Req() req: Request,
  ): Promise<void> {
    try {
      const user = req['user'];

      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }

      const reserva = await this.reservaService.findOne(id);
      if (!reserva) {
        throw new NotFoundException(`No se encontró la reserva con ID ${id}`);
      }

      if (user.rol !== 'super-admin' && user.rol !== 'admin' && user.id !== reserva.ci_usuario) {
        throw new ForbiddenException('No tienes permiso para actualizar esta reserva');
      }

      await this.reservaService.update(id, reservaData);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(`Error al actualizar la reserva con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al actualizar la reserva con ID ${id}`,
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

      const reserva = await this.reservaService.findOne(id);
      if (!reserva) {
        throw new NotFoundException(`No se encontró la reserva con ID ${id}`);
      }

      if (user.rol !== 'super-admin' && user.rol !== 'admin' && user.id !== reserva.ci_usuario) {
        throw new ForbiddenException('No tienes permiso para eliminar esta reserva');
      }

      await this.reservaService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(`Error al eliminar la reserva con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al eliminar la reserva con ID ${id}`,
      );
    }
  }
}
