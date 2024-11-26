import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Reserva } from './reserva.entity';
import { TipoEvento } from './tipo_evento.entity';

@Entity('eventos')
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Reserva)
  @JoinColumn({ name: 'id_reserva' })
  id_reserva: Reserva;

  @ManyToOne(() => TipoEvento)
  @JoinColumn({ name: 'id_tipo_evento' })
  id_tipo_evento: TipoEvento;

  @Column({ length: 255 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'date' })
  fecha_evento: Date;
}
