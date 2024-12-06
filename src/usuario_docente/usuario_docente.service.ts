/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioDocente } from './usuario_docente.entity';
import { CreateUsuarioDocenteDto } from './dto/create-usuario-docente.dto';

@Injectable()
export class UsuarioDocenteService {
  constructor(
    @InjectRepository(UsuarioDocente)
    private userDocenteRepository: Repository<UsuarioDocente>,
  ) {}

  createUserDocente(
    userDocente: CreateUsuarioDocenteDto,
  ): Promise<UsuarioDocente> {
    const newUserDocente = this.userDocenteRepository.create(userDocente);
    return this.userDocenteRepository.save(newUserDocente);
  }

  getUserDocente() {
    return this.userDocenteRepository.find();
  }
}
