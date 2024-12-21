import { Entity, Column,PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Estado {
	@PrimaryGeneratedColumn()
	_id: number;

	@Column({ length: 32 })
	descripcion: string;
}
