/* eslint-disable prettier/prettier */

import { Body, Controller, Post } from '@nestjs/common';
import { Docente } from './docentes.entity';
import { DocentesService } from './docentes.service';

@Controller('docentes')
export class DocentesController {
  constructor(private docentesService: DocentesService) {}

  @Post()
  createDocente(@Body() newDocente: Docente) {
    return this.docentesService.createDocente(newDocente);
  }
}
