import {Controller,Get,Post,Body,Param,Req,BadRequestException,NotFoundException,ForbiddenException,InternalServerErrorException,} from '@nestjs/common';
import { PresidenteOtbService } from './presidente_otb.service';
import { PresidenteOtb } from '../../entities/presidente_otb.entity';
import { Usuario } from '../../entities/usuario.entity';
import { Request } from 'express';

@Controller('presidentes_otb')
export class PresidenteOtbController {
  constructor(private readonly presidenteOtbService: PresidenteOtbService) {}

  @Get()
  async findAll(@Req() req: Request): Promise<PresidenteOtb[]> {
    try {
      const user = req['user'];

      // Validar rol
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para listar los presidentes de OTB',
        );
      }

      const presidentes = await this.presidenteOtbService.findAll();
      if (presidentes.length === 0) {
        throw new NotFoundException('No se encontraron presidentes de OTB registrados');
      }
      return presidentes;
    } catch (error) {
      console.error('Error al obtener presidentes de OTB:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener los presidentes de OTB',
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<PresidenteOtb> {
    try {
      const user = req['user'];

      // Validar rol
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para consultar este presidente de OTB',
        );
      }

      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }
      const presidente = await this.presidenteOtbService.findOne(id);
      if (!presidente) {
        throw new NotFoundException(`No se encontró el presidente de OTB con ID ${id}`);
      }
      return presidente;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(`Error al buscar el presidente de OTB con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al buscar el presidente de OTB con ID ${id}`,
      );
    }
  }

  @Post()
  async create(
    @Body() body: { ci_usuario: number; otb: string; documento: Buffer },
    @Req() req: Request,
  ): Promise<PresidenteOtb> {
    try {
      const user = req['user'];

      // Validar rol
      if (user.rol !== 'super-admin' && user.rol !== 'admin') {
        throw new ForbiddenException(
          'No tienes permiso para registrar un presidente de OTB',
        );
      }

      // Validar campos obligatorios
      const { ci_usuario, otb, documento } = body;
      if (!ci_usuario || !otb || !documento) {
        throw new BadRequestException(
          'Los campos ci_usuario, otb y documento son obligatorios',
        );
      }

      // Buscar el usuario por su ci_usuario
      const usuario: Usuario = await this.presidenteOtbService.findUsuarioByCi(ci_usuario);
      if (!usuario) {
        throw new NotFoundException(
          `No se encontró un usuario con CI ${ci_usuario}`,
        );
      }

      // Crear el presidente de OTB
      return await this.presidenteOtbService.create({
        ci_usuario: usuario, // Pasa el objeto Usuario completo
        otb,
        documento,
      });
    } catch (error) {
      console.error('Error al registrar el presidente de OTB:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al registrar el presidente de OTB',
      );
    }
  }
}
