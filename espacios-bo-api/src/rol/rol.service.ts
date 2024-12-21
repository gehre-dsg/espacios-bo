import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rol } from "./rol.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepos: Repository<Rol>
  ) { }

  async findAll(): Promise<Rol[]> {
    return await this.rolRepos.find();
  }

  async findOneId(id: number): Promise<Rol> {
    return await this.rolRepos.findOneBy({ _id: id });
  }
}