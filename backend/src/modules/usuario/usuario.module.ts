import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../../entities/usuario.entity';
import { Role } from '../../entities/rol.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Role]),
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
