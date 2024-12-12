import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisoEvento } from './evento-permiso.entity';
import { PermisoEventoService } from './evento-permiso.service';
import { EventoPermisoController } from './evento-permiso.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PermisoEvento])],
  providers: [PermisoEvento],
  controllers: [EventoPermisoController],
})
export class EventoPermisoModule {}
