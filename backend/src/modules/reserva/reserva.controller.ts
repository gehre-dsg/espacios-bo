import {Controller,Get,Post,Put,Delete,Body,Param,NotFoundException,BadRequestException,InternalServerErrorException,} from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { Reserva } from '../../entities/reserva.entity';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Get()
  async findAll(): Promise<Reserva[]> {
    try {
      const reservas = await this.reservaService.findAll();
      if (!reservas || reservas.length === 0) {
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
  async findOne(@Param('id') id: number): Promise<Reserva> {
    try {
      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }
      const reserva = await this.reservaService.findOne(id);
      if (!reserva) {
        throw new NotFoundException(`No se encontró la reserva con ID ${id}`);
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
  async create(@Body() reservaData: Partial<Reserva>): Promise<Reserva> {
    try {
      if (!reservaData.fecha || !reservaData.hora_inicio || !reservaData.hora_fin) {
        throw new BadRequestException(
          'Los campos fecha, hora_inicio y hora_fin son obligatorios',
        );
      }
      if (!reservaData.ci_usuario || !reservaData.id_espacio_publico) {
        throw new BadRequestException(
          'Los campos ci_usuario y id_espacio_publico son obligatorios',
        );
      }
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
  ): Promise<void> {
    try {
      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }

      // Verificar si la reserva existe antes de intentar actualizar
      const reserva = await this.reservaService.findOne(id);
      if (!reserva) {
        throw new NotFoundException(`No se encontró la reserva con ID ${id}`);
      }

      // Validar datos antes de actualizar
      if (reservaData.fecha && !reservaData.hora_inicio && !reservaData.hora_fin) {
        throw new BadRequestException(
          'Si se actualiza la fecha, también se deben incluir hora_inicio y hora_fin',
        );
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
  async delete(@Param('id') id: number): Promise<void> {
    try {
      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }

      // Verificar si la reserva existe antes de intentar eliminarla
      const reserva = await this.reservaService.findOne(id);
      if (!reserva) {
        throw new NotFoundException(`No se encontró la reserva con ID ${id}`);
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
