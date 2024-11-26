import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoPermiso } from '../../entities/evento_permiso.entity';
import { EventoPermisoService } from './evento-permiso.service';
import { EventoPermisoController } from './evento-permiso.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventoPermiso])],
  providers: [EventoPermisoService],
  controllers: [EventoPermisoController],
})
export class EventoPermisoModule {}
