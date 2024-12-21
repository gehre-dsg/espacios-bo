import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoService } from './estado.service';
import { EstadoController } from './estado.controller';
import { Estado } from './estado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estado])],
  providers: [EstadoService],
  controllers: [EstadoController]
})
export class EstadoModule {}
