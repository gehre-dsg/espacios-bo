import { Controller, Get, Post, Put, Patch, Delete, Body, Param, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';


@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

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
    try {
      usuarioData.nombre = usuarioData.nombre || 'Usuario temporal';
      usuarioData.ap_paterno = usuarioData.ap_paterno || 'Apellido temporal';
      usuarioData.ap_materno = usuarioData.ap_materno || 'Apellido temporal';
      usuarioData.direccion = usuarioData.direccion || 'Sin dirección';
      usuarioData.telefono = usuarioData.telefono || 'Sin teléfono';

      return this.usuarioService.create(usuarioData);
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
  update(@Param('id') id: number, @Body() usuarioData: Partial<Usuario>): Promise<void> {
    return this.usuarioService.update(id, usuarioData);
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
  delete(@Param('id') id: number): Promise<void> {
    return this.usuarioService.delete(id);
  }
}
