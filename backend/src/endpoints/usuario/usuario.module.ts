import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { Rol } from '../rol/rol.entity';
import { Estado } from '../estado/estado.entity';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Rol, Estado]),
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'usuarios', method: RequestMethod.POST }, // Excluir POST /usuarios
        { path: 'usuarios/:id', method: RequestMethod.PATCH } // Excluir PATCH /usuarios/:id
      )
      .forRoutes(UsuarioController);
  }
}
