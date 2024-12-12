import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PermisoModule } from './endpoints/permiso/permiso.module'; // Módulo de permiso
import { EventoModule } from './endpoints/evento/evento.module'; // Módulo de evento
import { PresidenteOtbModule } from './modules/presidente-otb/presidente_otb.module'; // Módulo de presidente_otb
import { EmpresaModule } from './modules/empresa/empresa.module';
import { EventoPermisoModule } from './endpoints/permiso-evento/evento-permiso.module';
import { ReservaModule } from './endpoints/reserva/reserva.module';

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
    UsuarioModule,
    PermisoModule,
    EventoModule, // Asegúrate de importar el módulo de Evento
    PresidenteOtbModule, // Asegúrate de importar el módulo de PresidenteOtb
    EmpresaModule,
    EventoPermisoModule,
    ReservaModule,
  ],
})
export class AppModule {}
