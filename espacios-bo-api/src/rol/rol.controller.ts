import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { RolService } from "./rol.service";

@Controller('roles')
export class RolController {
  constructor(private rolService: RolService) {}

  @Get()
  findAll() {
    try {
      const response = this.rolService.findAll();
      return response;
    } catch(error: any) {
      console.log(error);
      throw error;
    }
  }

  @Get(':rolId')
  findOneId(@Param('rolId', ParseIntPipe) id: number) {
    try {
      const response = this.rolService.findOneId(id);
      return response;
    } catch(error: any) {
      console.log(error);
      throw error;
    }
  }
}