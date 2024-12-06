/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { Alumno } from './alumnos.entity';

@Controller('alumnos')
export class AlumnosController {
  constructor(private alumnosService: AlumnosService) {}

  // URL: http://localhost:3000/alumnos
  @Get()
  getAlumnos(): Promise<Alumno[]> {
    return this.alumnosService.getAlumnos();
  }

  // URL: http://localhost:3000/alumnos/con-padres
  @Get('padres')
  getAlumnosConPadres(): Promise<Alumno[]> {
    return this.alumnosService.getAlumnoWithPadre();
  }

  // URL: http://localhost:3000/alumnos/details
  @Get('details')
  getAlumnoWithDetails(): Promise<Alumno[]> {
    return this.alumnosService.getAlumnosWithDetails();
  }

  // URL: http://localhost:3000/alumnos/1
  @Get(':id')
  getAlumno(@Param('id', ParseIntPipe) id: number): Promise<Alumno> {
    return this.alumnosService.getAlumno(id);
  }
  //** POST **/
  // URL: http://localhost:3000/alumnos
  @Post()
  createAlumno(@Body() newAlumno: CreateAlumnoDto): Promise<Alumno> {
    return this.alumnosService.createAlumno(newAlumno);
  }

  //** DELETE **//
  // URL: http://localhost:3000/alumnos/1
  @Delete('delete/:id')
  deleteAlumno(@Param('id', ParseIntPipe) id: number) {
    return this.alumnosService.deleteAlumno(id);
  }
}
