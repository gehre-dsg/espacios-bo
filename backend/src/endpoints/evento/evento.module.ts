import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { Evento } from '../../entities/evento.entity';
import { Reserva } from '../../entities/reserva.entity';
import { TipoEvento } from '../tipo-evento/tipo-evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, Reserva, TipoEvento])],
  providers: [EventoService],
  controllers: [EventoController],
})
export class EventoModule {}
