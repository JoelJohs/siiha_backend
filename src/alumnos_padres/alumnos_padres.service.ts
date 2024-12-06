/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AlumnoUsuarioPadre } from './alumnos_padres.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlumnosPadresService {
  constructor(
    @InjectRepository(AlumnoUsuarioPadre)
    private alumnoUsuarioPadreRepository: Repository<AlumnoUsuarioPadre>,
  ) {}

  createRelacion(
    alumnoId: number,
    usuarioPadreId: number,
  ): Promise<AlumnoUsuarioPadre> {
    const relacion = this.alumnoUsuarioPadreRepository.create({
      alumno_id: alumnoId,
      usuario_padre_id: usuarioPadreId,
    });
    return this.alumnoUsuarioPadreRepository.save(relacion);
  }

  getRelaciones(): Promise<AlumnoUsuarioPadre[]> {
    return this.alumnoUsuarioPadreRepository.find({
      relations: [
        'alumno',
        'alumno.nombres',
        'alumno.apellido_paterno',
        'alumno.apellido_materno',
        'usuario_padre',
        'usuario_padre.padre_tutor',
        'usuario_padre.padre_tutor.nombres',
        'usuario_padre.padre_tutor.apellido_paterno',
        'usuario_padre.padre_tutor.apellido_materno',
      ],
    });
  }
}
