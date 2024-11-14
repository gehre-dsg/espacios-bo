// usuario.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../../entities/usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Usuario> {
    return this.usuarioService.findOne(id);
  }

  @Post()
  create(@Body() usuarioData: Partial<Usuario>): Promise<Usuario> {
    return this.usuarioService.create(usuarioData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() usuarioData: Partial<Usuario>): Promise<void> {
    return this.usuarioService.update(id, usuarioData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.usuarioService.delete(id);
  }
}
