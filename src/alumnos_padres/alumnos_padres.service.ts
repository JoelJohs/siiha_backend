/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlumnoUsuarioPadre } from './alumnos_padres.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAlumnoUsuarioPadreDto } from './dto/update-alumnos-padres.dto';

@Injectable()
export class AlumnosPadresService {
  constructor(
    @InjectRepository(AlumnoUsuarioPadre)
    private alumnoUsuarioPadreRepository: Repository<AlumnoUsuarioPadre>,
  ) {}

  // Crear una nueva relación
  async createRelacion(
    alumnoId: number,
    usuarioPadreId: number,
  ): Promise<AlumnoUsuarioPadre> {
    try {
      const relacion = this.alumnoUsuarioPadreRepository.create({
        alumno_id: alumnoId,
        usuario_padre_id: usuarioPadreId,
      });
      return await this.alumnoUsuarioPadreRepository.save(relacion);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('La relación ya existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Error al crear la relación',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Obtener todas las relaciones
  async getRelaciones(): Promise<AlumnoUsuarioPadre[]> {
    try {
      return await this.alumnoUsuarioPadreRepository.find({
        relations: ['alumno', 'usuario_padre', 'usuario_padre.padre_tutor'],
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener las relaciones',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Actualizar una relación
  async updateRelacion(
    alumnoId: number,
    usuarioPadreId: number,
    updateDto: UpdateAlumnoUsuarioPadreDto,
  ): Promise<AlumnoUsuarioPadre> {
    try {
      const relacion = await this.alumnoUsuarioPadreRepository.findOne({
        where: { alumno_id: alumnoId, usuario_padre_id: usuarioPadreId },
      });

      if (!relacion) {
        throw new HttpException('Relación no encontrada', HttpStatus.NOT_FOUND);
      }

      // Actualizar propiedades si se proporcionan en el DTO
      if (updateDto.alumno_id) {
        relacion.alumno_id = updateDto.alumno_id;
      }
      if (updateDto.usuario_padre_id) {
        relacion.usuario_padre_id = updateDto.usuario_padre_id;
      }

      return await this.alumnoUsuarioPadreRepository.save(relacion);
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al actualizar la relación',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Eliminar una relación
  async deleteRelacion(id: number): Promise<void> {
    try {
      const result = await this.alumnoUsuarioPadreRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Relación no encontrada', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al eliminar la relación',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
