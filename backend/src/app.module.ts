import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PermisoModule } from './modules/permiso/permiso.module'; // Módulo de permiso
import { EventoModule } from './modules/evento/evento.module'; // Módulo de evento
import { PresidenteOtbModule } from './modules/presidente_otb/presidente_otb.module'; // Módulo de presidente_otb
import { EmpresaModule } from './modules/empresa/empresa.module';
import { EventoPermisoModule } from './modules/evento-permiso/evento-permiso.module';
import { ReservaModule } from './modules/reserva/reserva.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'appuser',
      password: 'app_password',
      database: 'proyecto_sisinfo',
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
