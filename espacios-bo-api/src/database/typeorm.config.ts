import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const typeOrmConfig: TypeOrmModuleOptions & DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'espacios-bo',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
}
