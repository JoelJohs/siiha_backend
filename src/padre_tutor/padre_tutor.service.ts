/* eslint-disable prettier/prettier */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PadreTutor } from './padre_tutor.entity';
import { Repository } from 'typeorm';
import { CreateTutorDto } from './dto/create-tutor.dts';
import { UpdateTutorDto } from './dto/update-tutor.dto';

@Injectable()
export class PadreTutorService {
  constructor(
    @InjectRepository(PadreTutor)
    private tutorRepository: Repository<PadreTutor>,
  ) {}

  // **Create Tutor**
  async createTutor(createTutorDto: CreateTutorDto): Promise<PadreTutor> {
    try {
      const newTutor = this.tutorRepository.create(createTutorDto);
      return await this.tutorRepository.save(newTutor);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('El RFC ya está en uso', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Error al crear el tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Tutores**
  async getTutores(): Promise<PadreTutor[]> {
    try {
      return await this.tutorRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los tutores',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Tutor por ID**
  async getTutorById(id: number): Promise<PadreTutor> {
    try {
      const tutor = await this.tutorRepository.findOne({
        where: { id_padre_tutor: id },
      });
      if (!tutor) {
        throw new HttpException('Tutor no encontrado', HttpStatus.NOT_FOUND);
      }
      return tutor;
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al obtener el tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Update Tutor**
  async updateTutor(id: number, updateTutorDto: UpdateTutorDto): Promise<PadreTutor> {
    try {
      const tutor = await this.tutorRepository.preload({
        id_padre_tutor: id,
        ...updateTutorDto,
      });

      if (!tutor) {
        throw new HttpException('Tutor no encontrado', HttpStatus.NOT_FOUND);
      }

      return await this.tutorRepository.save(tutor);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('El RFC ya está en uso', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Error al actualizar el tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Delete Tutor**
  async deleteTutor(id: number): Promise<void> {
    try {
      const result = await this.tutorRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Tutor no encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al eliminar el tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
