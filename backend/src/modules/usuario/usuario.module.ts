import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../../entities/usuario.entity';
import { Role } from '../../entities/rol.entity'; // Importar la entidad Role
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Role]), // Incluir también la entidad Role
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UsuarioController);
  }
}
