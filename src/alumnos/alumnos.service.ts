/* eslint-disable prettier/prettier */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno } from './alumnos.entity';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alumno) private alumnoRepository: Repository<Alumno>,
  ) {}

  // **Create Alumno**
  async createAlumno(alumno: CreateAlumnoDto): Promise<Alumno> {
    try {
      const newAlumno = this.alumnoRepository.create(alumno);
      return await this.alumnoRepository.save(newAlumno);
    } catch (error) {
      // Manejo de errores específicos, por ejemplo, violaciones de restricciones
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('El alumno ya existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Error al crear el alumno',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Alumnos**
  async getAlumnos(): Promise<Alumno[]> {
    try {
      return await this.alumnoRepository.find();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al obtener los alumnos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Alumno por ID**
  async getAlumno(id: number): Promise<Alumno> {
    try {
      const alumnoFound = await this.alumnoRepository.findOne({
        where: { id },
        relations: [
          'alumnoUsuarioPadres',
          'alumnoUsuarioPadres.usuario_padre',
          'alumnoUsuarioPadres.usuario_padre.padre_tutor',
          'grupo',
          'grupo.usuario_docente',
        ],
      });

      if (!alumnoFound) {
        throw new HttpException('Alumno no encontrado', HttpStatus.NOT_FOUND);
      }

      return alumnoFound;
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al obtener el alumno',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Alumnos con Padres**
  async getAlumnoWithPadre(): Promise<Alumno[]> {
    try {
      return await this.alumnoRepository.find({
        relations: [
          'alumnoUsuarioPadres',
          'alumnoUsuarioPadres.usuario_padre',
          'alumnoUsuarioPadres.usuario_padre.padre_tutor',
        ],
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al obtener los alumnos con padres',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Alumnos con Detalles Adicionales**
  async getAlumnosWithDetails(): Promise<Alumno[]> {
    try {
      return await this.alumnoRepository.find({
        relations: [
          'alumnoUsuarioPadres',
          'alumnoUsuarioPadres.usuario_padre',
          'alumnoUsuarioPadres.usuario_padre.padre_tutor',
          'grupo',
          'grupo.usuario_docente',
          // Añade más relaciones si es necesario
        ],
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los detalles de los alumnos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Update Alumno**
  async updateAlumno(id: number, alumno: UpdateAlumnoDto): Promise<Alumno> {
    try {
      const alumnoFound = await this.alumnoRepository.findOne({
        where: { id },
      });

      if (!alumnoFound) {
        throw new HttpException('Alumno no encontrado', HttpStatus.NOT_FOUND);
      }

      await this.alumnoRepository.update(id, alumno);
      return await this.alumnoRepository.findOne({
        where: { id },
        relations: [
          'alumnoUsuarioPadres',
          'alumnoUsuarioPadres.usuario_padre',
          'alumnoUsuarioPadres.usuario_padre.padre_tutor',
          'grupo',
          'grupo.usuario_docente',
        ],
      });
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al actualizar el alumno',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //** Delete Alumno **// 
  async deleteAlumno(id: number): Promise<{ affected: number }> {
    try {
      const result = await this.alumnoRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Alumno no encontrado', HttpStatus.NOT_FOUND);
      }
      return { affected: result.affected ?? 0 };
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al eliminar el alumno',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
