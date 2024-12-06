/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioPadre } from './usuarios.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioPadreDto } from './dto/create-user-padre.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioPadre)
    private userPadreRepository: Repository<UsuarioPadre>,
  ) {}

  createUserPadre(userPadre: CreateUsuarioPadreDto): Promise<UsuarioPadre> {
    const newUserPadre = this.userPadreRepository.create(userPadre);
    return this.userPadreRepository.save(newUserPadre);
  }

  getUserPadre() {
    return this.userPadreRepository.find();
  }
}
