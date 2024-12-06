/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno } from './alumnos.entity';
import { CreateAlumnoDto } from './dto/create-alumno.dto';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alumno) private alumnoRepository: Repository<Alumno>,
  ) {}

  createAlumno(alumno: CreateAlumnoDto): Promise<Alumno> {
    const newAlumno = this.alumnoRepository.create(alumno);
    return this.alumnoRepository.save(newAlumno);
  }

  getAlumnos() {
    return this.alumnoRepository.find();
  }
}
