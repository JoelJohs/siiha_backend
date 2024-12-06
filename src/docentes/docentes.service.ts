/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from './docentes.entity';
import { Repository } from 'typeorm';
import { CreateDocenteDto } from './dto/create-docente.dto';

@Injectable()
export class DocentesService {
  constructor(
    @InjectRepository(Docente) private docenteRepository: Repository<Docente>,
  ) {}

  createDocente(docente: CreateDocenteDto): Promise<Docente> {
    const newDocente = this.docenteRepository.create(docente);
    return this.docenteRepository.save(newDocente);
  }
}
