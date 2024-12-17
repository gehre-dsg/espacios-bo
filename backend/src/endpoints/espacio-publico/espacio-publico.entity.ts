import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('espacios-publicos') // Entidad estatica
@Index('idx_nombre', ['nombre'])
export class EspacioPublico {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 255})
  url_imagen: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column('decimal', { precision: 9, scale: 6 })
  latitud: number;

  @Column('decimal', { precision: 9, scale: 6 })
  longitud: number;

  @Column({ length: 255 })
  direccion: string;
}
