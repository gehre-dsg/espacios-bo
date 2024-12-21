import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { UsuarioModule } from './usuario/usuario.module';
import { EstadoModule } from './estado/estado.module';
import { RolModule } from './rol/rol.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsuarioModule,
    EstadoModule,
    RolModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
