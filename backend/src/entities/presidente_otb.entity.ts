import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('presidentes_otb')
export class PresidenteOtb {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'ci_usuario' })
  ci_usuario: Usuario;

  @Column({ length: 100 })
  otb: string;

  @Column({ type: 'blob' })
  documento: Buffer;
}
