import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PermisoEventoService } from './evento-permiso.service';
import { PermisoEvento } from './evento-permiso.entity';

@Controller('eventos-permisos')
export class PermisoEventoController {
  constructor(private readonly PermisoEventoService: PermisoEventoService) { }

  @Get()
  findAll(): Promise<PermisoEvento[]> {
    return this.PermisoEventoService.findAll();
  }

  @Get(':id_evento/:id_permiso')
  findOne(
    @Param('id_evento') id_evento: number,
    @Param('id_permiso') id_permiso: number,
  ): Promise<PermisoEvento> {
    return this.PermisoEventoService.findOne(id_evento, id_permiso);
  }

  @Post()
  create(
    @Body('id_evento') id_evento: number,      // Extraemos id_evento del cuerpo
    @Body('id_permiso') id_permiso: number,    // Extraemos id_permiso del cuerpo
    @Body('documento') documento: Buffer,      // Extraemos documento del cuerpo
  ): Promise<PermisoEvento> {
    return this.PermisoEventoService.create({ id_evento, id_permiso, documento }); //modificado
  }

  @Put(':id_evento/:id_permiso')
  async update(
    @Param('id_evento') id_evento: number,
    @Param('id_permiso') id_permiso: number,
    @Body() data: Partial<PermisoEvento>,
  ): Promise<void> {
    await this.PermisoEventoService.update(id_evento, id_permiso, { documento: data.documento });
  }


  @Delete(':id_evento/:id_permiso')
  delete(
    @Param('id_evento') id_evento: number,
    @Param('id_permiso') id_permiso: number,
  ): Promise<void> {
    return this.PermisoEventoService.delete(id_evento, id_permiso);
  }
}
