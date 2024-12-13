import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { EspacioPublico } from '../espacio-publico/espacio-publico.entity';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  _id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'ci' })
  usuario: Usuario;

  @ManyToOne(() => EspacioPublico)
  @JoinColumn({ name: '_id' })
  espacio_publico: EspacioPublico;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'time' })
  hora_inicio: string;

  @Column({ type: 'time' })
  hora_fin: string;
}
