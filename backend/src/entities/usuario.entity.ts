import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './rol.entity'

@Entity('usuarios')
export class Usuario {
  @PrimaryColumn()
  ci_usuario: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  ap_paterno: string;

  @Column({ length: 50 })
  ap_materno: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  contrasena: string;

  @Column({ length: 255 })
  direccion: string;

  @Column({ length: 20 })
  telefono: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'id_rol' })
  id_rol: Role;
}
