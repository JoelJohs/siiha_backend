/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { Pago } from './pagos.entity';

@Controller('pagos')
export class PagosController {
  constructor(private pagosService: PagosService) {}

  @Get()
  getPagos() {
    return this.pagosService.getPagos();
  }

  //Get all pagos with details
  // url: http://localhost:3000/pagos/details
  @Get('details')
  getAllPagosWithDetails(): Promise<Pago[]> {
    return this.pagosService.getAllPagosWithDetails();
  }

  //Get pagos by tutor id
  // url: http://localhost:3000/pagos/tutor/1
  @Get('tutor/:id')
  getPagoByTutorId(@Param('id', ParseIntPipe) id: number): Promise<Pago[]> {
    return this.pagosService.getPagoByTutorId(id);
  }

  @Post()
  createPago(@Body() newPago: CreatePagoDto) {
    return this.pagosService.createPago(newPago);
  }
}
