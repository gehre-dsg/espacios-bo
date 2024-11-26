import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipos_eventos')
export class TipoEvento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  tipo_evento: string;
}

// Deberia ser datos estaticos