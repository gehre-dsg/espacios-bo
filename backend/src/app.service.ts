import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsuarioService } from './modules/usuario/usuario.service';

@Injectable()
export class AppService {
  constructor(private readonly usuarioService: UsuarioService) {}

  getHello(): string {
    return 'Hello World!';
  }

}
