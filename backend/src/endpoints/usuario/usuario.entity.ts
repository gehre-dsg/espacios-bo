import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Rol } from '../rol/rol.entity'
import { Estado } from '../estado/estado.entity'

@Entity('usuarios')
export class Usuario {
  @PrimaryColumn()
  ci: number;

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

  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'rol' })
  rol: Rol;

  @OneToOne(() => Estado)
  @JoinColumn({ name: 'estado'})
  estado: Estado;
}
