/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grupo } from './grupos.entity';
import { Repository } from 'typeorm';
import { CreateGrupoDto } from './dto/create-grupo.dto';

@Injectable()
export class GruposService {
  constructor(
    @InjectRepository(Grupo) private grupoRepository: Repository<Grupo>,
  ) {}

  createGrupo(grupo: CreateGrupoDto): Promise<Grupo> {
    const newGrupo = this.grupoRepository.create(grupo);
    return this.grupoRepository.save(newGrupo);
  }

  getGrupos(): Promise<Grupo[]> {
    return this.grupoRepository.find();
  }

  getGrupoWithDetails(): Promise<Grupo[]> {
    return this.grupoRepository.find({
      relations: ['usuario_docente', 'usuario_docente.docente', 'alumnos'],
    });
  }

  getGrupoById(id: number): Promise<Grupo> {
    return this.grupoRepository.findOne({
      where: { id_grupo: id },
      relations: ['usuario_docente', 'usuario_docente.docente', 'alumnos'],
    });
  }
}
