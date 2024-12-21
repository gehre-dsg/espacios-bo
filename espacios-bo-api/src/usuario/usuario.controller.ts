import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) { }

  @Get()
  getAll() {
    try {
      const response = this.usuarioService.findAll();
      return response;
    } catch (error: any) {
      console.log(error);
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
}
