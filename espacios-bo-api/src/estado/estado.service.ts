import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estado } from './estado.entity';

@Injectable()
export class EstadoService {
  constructor(
    @InjectRepository(Estado)
    private readonly estadoRepos: Repository<Estado>,
  ) { }

  async findAll(): Promise<Estado[]> {
    return await this.estadoRepos.find();
  }

  async findOneId(id: number): Promise<Estado> {
    return await this.estadoRepos.findOne({ where: { _id: id } });
  }
}

