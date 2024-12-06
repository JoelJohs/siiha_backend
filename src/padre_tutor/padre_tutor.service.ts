/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PadreTutor } from './padre_tutor.entity';
import { Repository } from 'typeorm';
import { CreateTutorDto } from './dto/create-tutor.dts';

@Injectable()
export class PadreTutorService {
  constructor(
    @InjectRepository(PadreTutor)
    private tutorRepository: Repository<PadreTutor>,
  ) {}

  createTutor(tutor: CreateTutorDto): Promise<PadreTutor> {
    const newTutor = this.tutorRepository.create(tutor);
    return this.tutorRepository.save(newTutor);
  }

  getTutor() {
    return this.tutorRepository.find();
  }
}
