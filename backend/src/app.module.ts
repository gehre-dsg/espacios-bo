import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './modules/usuario/usuario.module';

@Module({
  imports: [
    // Configuración de TypeORM
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',          // Cambia a la dirección de tu servidor de base de datos
      port: 3306,                 // Cambia el puerto si no es el predeterminado
      username: 'root',           // Cambia a tu usuario de MySQL
      password: '130417140336',   // Cambia a tu contraseña de MySQL
      database: 'proyecto_sisinfo', // Cambia al nombre de tu base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Busca entidades en todo el proyecto
      synchronize: true,          // Sincronización automática (solo en desarrollo)
      logging: ['query', 'error'], // Muestra las queries y errores en consola
    }),
    UsuarioModule, // Importa el módulo de usuarios
  ],
})
export class AppModule {}
