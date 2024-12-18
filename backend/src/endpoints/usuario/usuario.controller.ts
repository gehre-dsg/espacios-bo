import { Controller, Get, Post, Put, Patch, Delete, Body, Param, BadRequestException, InternalServerErrorException, NotFoundException, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';  // Importa el AuthGuard
import { RolesGuard } from 'src/modules/auth/roles/roles.guard';   // Importa el RolesGuard
import { Roles } from 'src/modules/auth/roles/roles.decorator';   // Importa el decorador personalizado de roles


@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  // Ruta protegida: solo usuarios autenticados
  @Get()
  @UseGuards(AuthGuard)  // Protege esta ruta con el AuthGuard
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  // Ruta protegida: solo usuarios autenticados
  @Get(':id')
  @UseGuards(AuthGuard)  // Protege esta ruta con el AuthGuard
  findOne(@Param('id') id: number): Promise<Usuario> {
    return this.usuarioService.findOne(id);
  }

  // Ruta protegida y solo accesible para el rol 'admin'
  @Post()
  @UseGuards(AuthGuard, RolesGuard)  // Protege con AuthGuard y RolesGuard
  @Roles('admin')  // Solo usuarios con rol 'admin' pueden acceder
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

  // Ruta protegida: solo usuarios autenticados y con rol 'admin'
  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)  // Protege con AuthGuard y RolesGuard
  @Roles('admin')  // Solo los 'admin' pueden acceder
  update(@Param('id') id: number, @Body() usuarioData: Partial<Usuario>): Promise<void> {
    return this.usuarioService.update(id, usuarioData);
  }

  // Ruta protegida: solo usuarios autenticados
  @Patch(':id')
  @UseGuards(AuthGuard)  // Protege esta ruta con el AuthGuard
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

  // Ruta protegida: solo usuarios autenticados y con rol 'admin'
  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)  // Protege con AuthGuard y RolesGuard
  @Roles('admin')  // Solo los 'admin' pueden acceder
  delete(@Param('id') id: number): Promise<void> {
    return this.usuarioService.delete(id);
  }

}