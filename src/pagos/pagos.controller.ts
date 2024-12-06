/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';

@Controller('pagos')
export class PagosController {
  constructor(private pagosService: PagosService) {}

  @Get()
  getPagos() {
    return this.pagosService.getPagos();
  }

  @Post()
  createPago(@Body() newPago: CreatePagoDto) {
    return this.pagosService.createPago(newPago);
  }
}
