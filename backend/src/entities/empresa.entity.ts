import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'ci_usuario' })
  ci_usuario: Usuario;

  @Column({ length: 100 })
  empresa: string;

  @Column({ type: 'blob' })
  documento: Buffer;
}
