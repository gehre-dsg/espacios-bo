import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',          // Cambia a la dirección de tu servidor de base de datos
      port: 3306,                 // Cambia el puerto si no es el predeterminado
      username: 'root',     // Cambia a tu usuario de MySQL
      password: '1234',  // Cambia a tu contraseña de MySQL
      database: 'proyecto_sisinfo', // Cambia al nombre de tu base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,          // ¡Cuidado! Esto sincroniza automáticamente la base de datos en desarrollo, pero desactívalo en producción
    }),
  ],
})
export class AppModule {}
