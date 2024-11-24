import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresidenteOtbService } from './presidente_otb.service';
import { PresidenteOtbController } from './presidente_otb.controller';
import { PresidenteOtb } from '../../entities/presidente_otb.entity';
import { Usuario } from '../../entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PresidenteOtb, Usuario])],
  providers: [PresidenteOtbService],
  controllers: [PresidenteOtbController],
})
export class PresidenteOtbModule {}
