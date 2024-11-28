import {Controller,Get,Post,Param,Body,BadRequestException,NotFoundException,InternalServerErrorException,} from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Empresa } from '../../entities/empresa.entity';
import { Usuario } from '../../entities/usuario.entity';

@Controller('empresas')
export class EmpresaController {
  constructor(
    private readonly empresaService: EmpresaService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Get()
  async findAll(): Promise<Empresa[]> {
    try {
      const empresas = await this.empresaService.findAll();
      if (empresas.length === 0) {
        throw new NotFoundException('No se encontraron empresas registradas');
      }
      return empresas;
    } catch (error) {
      console.error('Error al obtener empresas:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener las empresas',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Empresa> {
    try {
      if (isNaN(id)) {
        throw new BadRequestException('El ID proporcionado no es válido');
      }
      const empresa = await this.empresaService.findOne(id);
      if (!empresa) {
        throw new NotFoundException(`No se encontró la empresa con ID ${id}`);
      }
      return empresa;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error(`Error al buscar la empresa con ID ${id}:`, error);
      throw new InternalServerErrorException(
        `Error al buscar la empresa con ID ${id}`,
      );
    }
  }

  @Post()
  async create(
    @Body() body: { ci_usuario: number; empresa: string; documento: Buffer },
  ): Promise<Empresa> {
    try {
      // Validar campos obligatorios
      const { ci_usuario, empresa, documento } = body;
      if (!ci_usuario || !empresa || !documento) {
        throw new BadRequestException(
          'Los campos ci_usuario, empresa y documento son obligatorios',
        );
      }

      // Buscar al usuario en la base de datos
      const usuario: Usuario = await this.usuarioService.findOne(ci_usuario);
      if (!usuario) {
        throw new NotFoundException(
          `No se encontró un usuario con CI ${ci_usuario}`,
        );
      }

      // Crear la empresa
      const newEmpresa = await this.empresaService.create({
        ci_usuario: usuario, // Pasa el objeto Usuario completo
        empresa,
        documento,
      });

      return newEmpresa;
    } catch (error) {
      console.error('Error al crear la empresa:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al registrar la empresa',
      );
    }
  }
}
