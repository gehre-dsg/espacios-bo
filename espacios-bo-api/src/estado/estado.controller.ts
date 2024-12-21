import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EstadoService } from './estado.service';

@Controller('estados')
export class EstadoController {
	constructor(private estadoService: EstadoService) { }

	@Get()
	getAll() {
		try {
			const response = this.estadoService.findAll();
			return response;
		} catch (error: any) {
			console.log(error)
			throw error;
		}
	}

	@Get(':id')
	getOneId(@Param('id', ParseIntPipe) id: number) {
		try {
			const response = this.estadoService.findOneId(id);
			return response;
		} catch (error: any) {
			console.error(error);
			throw error;
		}
	}
}
