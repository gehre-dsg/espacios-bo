import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EventoPermisoService } from './evento-permiso.service';
import { EventoPermiso } from '../../entities/evento_permiso.entity';

@Controller('eventos-permisos')
export class EventoPermisoController {
  constructor(private readonly eventoPermisoService: EventoPermisoService) {}

  @Get()
  findAll(): Promise<EventoPermiso[]> {
    return this.eventoPermisoService.findAll();
  }

  @Get(':id_evento/:id_permiso')
  findOne(
    @Param('id_evento') id_evento: number,
    @Param('id_permiso') id_permiso: number,
  ): Promise<EventoPermiso> {
    return this.eventoPermisoService.findOne(id_evento, id_permiso);
  }

  @Post()
  create(@Body() data: Partial<EventoPermiso>): Promise<EventoPermiso> {
    return this.eventoPermisoService.create(data);
  }

  @Put(':id_evento/:id_permiso')
  update(
    @Param('id_evento') id_evento: number,
    @Param('id_permiso') id_permiso: number,
    @Body() data: Partial<EventoPermiso>,
  ): Promise<void> {
    return this.eventoPermisoService.update(id_evento, id_permiso, data);
  }

  @Delete(':id_evento/:id_permiso')
  delete(
    @Param('id_evento') id_evento: number,
    @Param('id_permiso') id_permiso: number,
  ): Promise<void> {
    return this.eventoPermisoService.delete(id_evento, id_permiso);
  }
}
