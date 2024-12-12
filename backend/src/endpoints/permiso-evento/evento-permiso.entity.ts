import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Evento } from './evento.entity';
import { Permiso } from '../permiso/permiso.entity';

@Entity('permisos-eventos')
export class PermisoEvento {
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
