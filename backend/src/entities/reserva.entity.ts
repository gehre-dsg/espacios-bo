import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { EspacioPublico } from './espacio_publico.entity';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'ci_usuario' })
  ci_usuario: Usuario;

  @ManyToOne(() => EspacioPublico)
  @JoinColumn({ name: 'id_espacio_publico' })
  id_espacio_publico: EspacioPublico;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'time' })
  hora_inicio: string;

  @Column({ type: 'time' })
  hora_fin: string;
}
