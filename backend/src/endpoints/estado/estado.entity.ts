import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('estados') // Entidad estatica
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  estado: string;
}