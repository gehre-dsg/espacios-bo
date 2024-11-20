import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './modules/usuario/usuario.module';

@Module({
  imports: [
    // Configuración de TypeORM
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',// dirección del servidor de base de datos
      port: 3306,// puerto
      username: 'root',// usuario de MySQL
      password: '1234',// contraseña de MySQL
      database: 'proyecto_sisinfo',// nombre de tu base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,// sincroniza automáticamente la base de datos en desarrollo
      logging: ['query', 'error'],
    }),
    UsuarioModule, // Importa el módulo de usuarios
  ],
})
export class AppModule {}
