/* eslint-disable prettier/prettier */

import { Body, Controller, Post } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { Grupo } from './grupos.entity';

@Controller('grupos')
export class GruposController {
  constructor(private gruposService: GruposService) {}

  @Post()
  createGrupo(@Body() newGrupo: Grupo) {
    return this.gruposService.createGrupo(newGrupo);
  }
}
