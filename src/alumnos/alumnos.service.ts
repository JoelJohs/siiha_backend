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

  //** Create Alumno **//

  createAlumno(alumno: CreateAlumnoDto): Promise<Alumno> {
    const newAlumno = this.alumnoRepository.create(alumno);
    return this.alumnoRepository.save(newAlumno);
  }

  //** Get Alumnos **//

  // URL: http://localhost:3000/alumnos
  getAlumnos() {
    return this.alumnoRepository.find();
  }

  // URL: http://localhost:3000/alumnos/1
  getAlumno(id: number) {
    return this.alumnoRepository.findOne({
      where: { id },
    });
  }

  getAlumnoWithPadre() {
    return this.alumnoRepository.find({
      relations: [
        'alumnoUsuarioPadres',
        'alumnoUsuarioPadres.usuario_padre',
        'alumnoUsuarioPadres.usuario_padre.padre_tutor',
      ],
    });
  }

  getAlumnosWithDetails(): Promise<Alumno[]> {
    return this.alumnoRepository.find({
      relations: [
        'alumnoUsuarioPadres',
        'alumnoUsuarioPadres.usuario_padre',
        'alumnoUsuarioPadres.usuario_padre.padre_tutor',
      ],
    });
  }

  //** Delete Alumno **/

  deleteAlumno(id: number) {
    return this.alumnoRepository.delete({ id });
  }
}
