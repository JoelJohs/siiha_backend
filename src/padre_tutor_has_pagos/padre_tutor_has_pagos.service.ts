/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PadreTutorHasPagos } from './padre_tutor_has_pagos.entity';
import { Repository } from 'typeorm';
import { CreateTutorPagoDto } from './dto/create-tutor-pago.dto';

@Injectable()
export class PadreTutorHasPagosService {
  constructor(
    @InjectRepository(PadreTutorHasPagos)
    private padrePagosRepository: Repository<PadreTutorHasPagos>,
  ) {}

  createPadrePago(padrePago: CreateTutorPagoDto): Promise<PadreTutorHasPagos> {
    const newPadrePago = this.padrePagosRepository.create(padrePago);
    return this.padrePagosRepository.save(newPadrePago);
  }

  getPadrePago() {
    return this.padrePagosRepository.find();
  }
}
