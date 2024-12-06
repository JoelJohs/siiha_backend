/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';

@Controller('alumnos')
export class AlumnosController {
  constructor(private alumnosService: AlumnosService) {}

  @Get()
  getAlumnos() {
    return this.alumnosService.getAlumnos();
  }

  @Post()
  createAlumno(@Body() newAlumno: CreateAlumnoDto) {
    return this.alumnosService.createAlumno(newAlumno);
  }
}
