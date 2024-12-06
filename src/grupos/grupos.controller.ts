/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GruposService } from './grupos.service';
import { Grupo } from './grupos.entity';

@Controller('grupos')
export class GruposController {
  constructor(private gruposService: GruposService) {}

  //* GET /grupos *//

  // Get all grupos
  // URL: http://localhost:3000/grupos
  @Get()
  getGrupos() {
    return this.gruposService.getGrupos();
  }

  // Get all grupos with details
  // URL: http://localhost:3000/grupos/details
  @Get('details')
  getGrupoWithDetails(): Promise<Grupo[]> {
    return this.gruposService.getGrupoWithDetails();
  }

  // Get grupo by id
  // URL: http://localhost:3000/grupos/1
  @Get(':id')
  getGrupoById(@Param('id', ParseIntPipe) id: number): Promise<Grupo> {
    return this.gruposService.getGrupoById(id);
  }

  //* POST /grupos *//

  @Post()
  createGrupo(@Body() newGrupo: Grupo) {
    return this.gruposService.createGrupo(newGrupo);
  }
}
