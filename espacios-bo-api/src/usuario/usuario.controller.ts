import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) { }

  @Get()
  getAll() {
    try {
      const response = this.usuarioService.findAll();
      return response;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  @Get(':userId')
  getOneCi(@Param('userId', ParseIntPipe) ci: number) {
    try {
      const response = this.usuarioService.findOneCi(ci);
      return response;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  @Get('email')
  getOneEmail(@Query('email') mail: string) {
    try {
      const response = this.usuarioService.findOneEmail(mail);
      return response;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  postOne(@Body() usuario: Partial<Usuario>) {
    try {
      const response = this.usuarioService.insertOne(usuario);
      return response;
    } catch (error: any) {
      console.error(error)
      throw error;
    }
  }

  @Put('key/:llave')
  updateOne(
    @Param('llave') llave: string,
    @Body() usuario: Partial<Usuario>
  ) {
    try {
      const parsedLlave = isNaN(Number(llave)) ? llave : Number(llave);
      const response = this.usuarioService.updateOne(parsedLlave, usuario);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete('key/:llave')
  deleteOne(
    @Param('llave') llave: string,
  ) {
    try {
      const parsedLlave = isNaN(Number(llave)) ? llave : Number(llave);
      const response = this.usuarioService.deleteOne(parsedLlave);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
