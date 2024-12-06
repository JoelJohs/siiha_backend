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
}
