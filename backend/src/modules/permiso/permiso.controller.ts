import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { Permiso } from '../../entities/permiso.entity';

@Controller('permisos')
export class PermisoController {
  constructor(private readonly permisoService: PermisoService) {}

  @Get()
  async findAll(): Promise<Permiso[]> {
    return this.permisoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Permiso> {
    return this.permisoService.findOne(id);
  }

  @Post()
  async create(@Body() body: { nombre_permiso: string }): Promise<Permiso> {
    return this.permisoService.create({
      nombre_permiso: body.nombre_permiso,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { nombre_permiso: string },
  ): Promise<Permiso> {
    return this.permisoService.update(id, {
      nombre_permiso: body.nombre_permiso,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.permisoService.delete(id);
  }
}
