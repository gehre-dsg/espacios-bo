import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm";
import { Estado } from "src/estado/estado.entity";
import { Rol } from "src/rol/rol.entity";

@Entity()
export class Usuario {
	@PrimaryColumn()
	ci: number;

	@Column({ length: 24 })
	nombre: string;

	@Column({ length: 20 })
	paterno: string;

	@Column({ length: 20 })
	materno: string;

	@Column({ length: 255, unique: true })
	email: string;

	@Column({ length: 255 })
	contrasena: string;

	@Column({ length: 11 })
	telefono: string;

	@ManyToOne(() => Estado)
	@JoinColumn({ name: 'estado_id'})
	estado_id: Estado;

	@ManyToOne(() => Rol)
	@JoinColumn({ name: 'rol_id' })
	rol_id: Rol;
}