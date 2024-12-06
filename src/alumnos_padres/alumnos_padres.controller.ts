/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlumnosPadresService } from './alumnos_padres.service';

@Controller('alumnos-padres')
export class AlumnosPadresController {
  constructor(private alumnosPadresService: AlumnosPadresService) {}

  @Post()
  createRelacion(@Body() body: { alumnoId: number; usuarioPadreId: number }) {
    return this.alumnosPadresService.createRelacion(
      body.alumnoId,
      body.usuarioPadreId,
    );
  }

  @Get()
  getRelaciones() {
    return this.alumnosPadresService.getRelaciones();
  }
}
