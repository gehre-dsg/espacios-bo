import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('espacios_publicos')
export class EspacioPublico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column('decimal', { precision: 9, scale: 6 })
  latitud: number;

  @Column('decimal', { precision: 9, scale: 6 })
  longitud: number;

  @Column({ length: 255 })
  direccion: string;
}

// Deberia ser datos estaticos