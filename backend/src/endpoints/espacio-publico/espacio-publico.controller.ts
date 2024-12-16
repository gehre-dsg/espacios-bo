import { Controller, Get } from '@nestjs/common';
import { EspacioPublicoService } from './espacio-publico.service';

@Controller('espacios-publicos')
export class EspacioPublicoController {
  constructor(private readonly espacioService: EspacioPublicoService) {}

  @Get()
  async getAll() {
    return this.espacioService.findAll();
  }

  @Get()
  async getById(id: number) {
    return this.espacioService.findById(id);
  }

  @Get()
  async getByName(name: string) {
    return this.espacioService.findByName(name);
  }
}
