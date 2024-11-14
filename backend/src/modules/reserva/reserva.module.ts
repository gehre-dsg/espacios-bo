// reserva.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from '../../entities/reserva.entity';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva])],
  providers: [ReservaService],
  controllers: [ReservaController],
  exports: [ReservaService],
})
export class ReservaModule {}
