/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PadreTutorHasPagosService } from './padre_tutor_has_pagos.service';
import { CreateTutorPagoDto } from './dto/create-tutor-pago.dto';
import { UpdateTutorPagoDto } from './dto/update-tutor-pago.dto';
import { PadreTutorHasPagos } from './padre_tutor_has_pagos.entity';

@Controller('padre-tutor-has-pagos')
export class PadreTutorHasPagosController {
  constructor(private padreTutorHasPagosService: PadreTutorHasPagosService) {}

  // **POST**
  // URL: http://localhost:3000/padre-tutor-has-pagos
  @Post()
  async createPadrePago(
    @Body() createTutorPagoDto: CreateTutorPagoDto,
  ): Promise<PadreTutorHasPagos> {
    try {
      return await this.padreTutorHasPagosService.createPadrePago(
        createTutorPagoDto,
      );
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al crear el pago del tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **GET**
  // URL: http://localhost:3000/padre-tutor-has-pagos
  @Get()
  async getTutorPagos(): Promise<PadreTutorHasPagos[]> {
    try {
      return await this.padreTutorHasPagosService.getTutorPagos();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los pagos de tutores',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // URL: http://localhost:3000/padre-tutor-has-pagos/:padre_tutor_id_padre_tutor/:pagos_id_pago
  @Get(':padre_tutor_id_padre_tutor/:pagos_id_pago')
  async getTutorPagoById(
    @Param('padre_tutor_id_padre_tutor', ParseIntPipe)
    padre_tutor_id_padre_tutor: number,
    @Param('pagos_id_pago', ParseIntPipe) pagos_id_pago: number,
  ): Promise<PadreTutorHasPagos> {
    try {
      return await this.padreTutorHasPagosService.getTutorPagoById(
        padre_tutor_id_padre_tutor,
        pagos_id_pago,
      );
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al obtener el pago del tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **PATCH**
  // URL: http://localhost:3000/padre-tutor-has-pagos/:padre_tutor_id_padre_tutor/:pagos_id_pago
  @Patch(':padre_tutor_id_padre_tutor/:pagos_id_pago')
  async updateTutorPago(
    @Param('padre_tutor_id_padre_tutor', ParseIntPipe)
    padre_tutor_id_padre_tutor: number,
    @Param('pagos_id_pago', ParseIntPipe) pagos_id_pago: number,
    @Body() updateTutorPagoDto: UpdateTutorPagoDto,
  ): Promise<PadreTutorHasPagos> {
    try {
      const updatedTutorPago =
        await this.padreTutorHasPagosService.updateTutorPago(
          padre_tutor_id_padre_tutor,
          pagos_id_pago,
          updateTutorPagoDto,
        );
      if (!updatedTutorPago) {
        throw new HttpException(
          'Pago de tutor no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedTutorPago;
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al actualizar el pago del tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **DELETE**
  // URL: http://localhost:3000/padre-tutor-has-pagos/:padre_tutor_id_padre_tutor/:pagos_id_pago
  @Delete(':padre_tutor_id_padre_tutor/:pagos_id_pago')
  async deleteTutorPago(
    @Param('padre_tutor_id_padre_tutor', ParseIntPipe)
    padre_tutor_id_padre_tutor: number,
    @Param('pagos_id_pago', ParseIntPipe) pagos_id_pago: number,
  ): Promise<void> {
    try {
      await this.padreTutorHasPagosService.deleteTutorPago(
        padre_tutor_id_padre_tutor,
        pagos_id_pago,
      );
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al eliminar el pago del tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
