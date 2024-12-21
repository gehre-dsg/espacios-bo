import { DataSource } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';

const EspaciosBoDataSource = new DataSource(typeOrmConfig);
export default EspaciosBoDataSource;
