import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Evento } from './evento.entity';
import { Permiso } from './permiso.entity';

@Entity('eventos_permisos')
export class EventoPermiso {
  @PrimaryColumn()
  id_evento: number;

  @PrimaryColumn()
  id_permiso: number;

  @ManyToOne(() => Evento)
  @JoinColumn({ name: 'id_evento' })
  evento: Evento;

  @ManyToOne(() => Permiso)
  @JoinColumn({ name: 'id_permiso' })
  permiso: Permiso;

  @Column({ type: 'blob' })
  documento: Buffer;
}
