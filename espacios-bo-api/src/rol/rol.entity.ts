import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({length: 16})
  tipo_rol: string;
}