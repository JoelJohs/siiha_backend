/* eslint-disable prettier/prettier */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from './docentes.entity';
import { Repository } from 'typeorm';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docentes.dto';

@Injectable()
export class DocentesService {
  constructor(
    @InjectRepository(Docente) private docenteRepository: Repository<Docente>,
  ) {}

  // **Create Docente**
  async createDocente(createDocenteDto: CreateDocenteDto): Promise<Docente> {
    try {
      const newDocente = this.docenteRepository.create(createDocenteDto);
      return await this.docenteRepository.save(newDocente);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('El RFC ya está en uso', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Error al crear el docente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get All Docentes**
  async getAllDocentes(): Promise<Docente[]> {
    try {
      return await this.docenteRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los docentes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Docente by ID**
  async getDocenteById(id: number): Promise<Docente> {
    try {
      const docente = await this.docenteRepository.findOne({
        where: { id_docente: id },
      });
      if (!docente) {
        throw new HttpException('Docente no encontrado', HttpStatus.NOT_FOUND);
      }
      return docente;
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al obtener el docente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Update Docente**
  async updateDocente(
    id: number,
    updateDocenteDto: UpdateDocenteDto,
  ): Promise<Docente> {
    try {
      const docente = await this.docenteRepository.preload({
        id_docente: id,
        ...updateDocenteDto,
      });

      if (!docente) {
        throw new HttpException('Docente no encontrado', HttpStatus.NOT_FOUND);
      }

      return await this.docenteRepository.save(docente);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('El RFC ya está en uso', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Error al actualizar el docente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Delete Docente**
  async deleteDocente(id: number): Promise<{ affected: number }> {
    try {
      const result = await this.docenteRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Docente no encontrado', HttpStatus.NOT_FOUND);
      }
      return { affected: result.affected ?? 0 };
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al eliminar el docente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
