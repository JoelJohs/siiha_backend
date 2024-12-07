/* eslint-disable prettier/prettier */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grupo } from './grupos.entity';
import { Repository } from 'typeorm';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';

@Injectable()
export class GruposService {
  constructor(
    @InjectRepository(Grupo) private grupoRepository: Repository<Grupo>,
  ) {}

  // **Create Grupo**
  async createGrupo(createGrupoDto: CreateGrupoDto): Promise<Grupo> {
    try {
      const newGrupo = this.grupoRepository.create(createGrupoDto);
      return await this.grupoRepository.save(newGrupo);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('El grupo ya existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Error al crear el grupo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Grupos**
  async getGrupos(): Promise<Grupo[]> {
    try {
      return await this.grupoRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los grupos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Grupo con Detalles**
  async getGrupoWithDetails(): Promise<Grupo[]> {
    try {
      return await this.grupoRepository.find({
        relations: ['usuario_docente', 'usuario_docente.docente', 'alumnos'],
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los grupos con detalles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Grupo por ID**
  async getGrupoById(id: number): Promise<Grupo> {
    try {
      const grupo = await this.grupoRepository.findOne({
        where: { id_grupo: id },
        relations: ['usuario_docente', 'usuario_docente.docente', 'alumnos'],
      });
      if (!grupo) {
        throw new HttpException('Grupo no encontrado', HttpStatus.NOT_FOUND);
      }
      return grupo;
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al obtener el grupo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Update Grupo**
  async updateGrupo(
    id: number,
    updateGrupoDto: UpdateGrupoDto,
  ): Promise<Grupo> {
    try {
      const grupo = await this.grupoRepository.preload({
        id_grupo: id,
        ...updateGrupoDto,
      });

      if (!grupo) {
        throw new HttpException('Grupo no encontrado', HttpStatus.NOT_FOUND);
      }

      return await this.grupoRepository.save(grupo);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'El nombre del grupo ya está en uso',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Error al actualizar el grupo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Delete Grupo**
  async deleteGrupo(id: number): Promise<void> {
    try {
      const result = await this.grupoRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Grupo no encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al eliminar el grupo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
