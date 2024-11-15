import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { RoleService } from './rol.service';
import { Role } from '../../entities/rol.entity';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Post()
  async create(@Body() body: { rol: string }): Promise<Role> {
    return this.roleService.create(body.rol);
  }
}
