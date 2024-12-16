import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EspacioPublico } from './espacio-publico.entity';

@Injectable()
export class EspacioPublicoService {
    constructor(
        @InjectRepository(EspacioPublico)
        private readonly espacioRepository: Repository<EspacioPublico>,
    ) { }

    async findAll(): Promise<EspacioPublico[]> {
        return this.espacioRepository.find();
    }

    async findById(id: number): Promise<EspacioPublico> {
        return this.espacioRepository.findOne({ where: { _id: id } });
    }

    async findByName(name: string): Promise<EspacioPublico> {
        return this.espacioRepository.findOne({ where: { nombre: name } });
    }
}
