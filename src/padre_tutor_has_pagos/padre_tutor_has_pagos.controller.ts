/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PadreTutorHasPagosService } from './padre_tutor_has_pagos.service';
import { CreateTutorPagoDto } from './dto/create-tutor-pago.dto';

@Controller('padre-tutor-has-pagos')
export class PadreTutorHasPagosController {
  constructor(private padreTutorHasPagosService: PadreTutorHasPagosService) {}

  @Get()
  getPadrePago() {
    return this.padreTutorHasPagosService.getPadrePago();
  }

  @Post()
  createPadrePago(@Body() newPadrePago: CreateTutorPagoDto) {
    return this.padreTutorHasPagosService.createPadrePago(newPadrePago);
  }
}
