import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './endpoints/usuario/usuario.module';
import { EventoModule } from './endpoints/evento/evento.module';
import { PresidenteOtbModule } from './endpoints/presidente-otb/presidente_otb.module';
import { EmpresaModule } from './endpoints/empresa/empresa.module';
import { PermisoEventoModule } from './endpoints/permiso-evento/permiso-evento.module';
import { ReservaModule } from './endpoints/reserva/reserva.module';
import { TransferenciaReservaModule } from './endpoints/transferencia-reserva/transferencia-reserva.module';
import { EspacioPublicoModule } from './endpoints/espacio-publico/espacio-publico.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'appuser',
      password: 'app_password',
      database: 'espacios_bo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: ['query', 'error'],
    }),
    EmpresaModule,
    EventoModule,
    PermisoEventoModule,
    PresidenteOtbModule,
    ReservaModule,
    TransferenciaReservaModule,
    UsuarioModule,
    EspacioPublicoModule,
  ],
})
export class AppModule {}
