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
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { Pago } from './pagos.entity';
import { UpdatePagoDto } from './dto/update-pagos.dto';

@Controller('pagos')
export class PagosController {
  constructor(private pagosService: PagosService) {}

  // **POST**
  // URL: http://localhost:3000/pagos
  @Post()
  async createPago(@Body() createPagoDto: CreatePagoDto): Promise<Pago> {
    try {
      return await this.pagosService.createPago(createPagoDto);
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al crear el pago',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **GET**
  // URL: http://localhost:3000/pagos
  @Get()
  async getPagos(): Promise<Pago[]> {
    try {
      return await this.pagosService.getPagos();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los pagos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // URL: http://localhost:3000/pagos/details
  @Get('details')
  async getAllPagosWithDetails(): Promise<Pago[]> {
    try {
      return await this.pagosService.getAllPagosWithDetails();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los pagos con detalles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // URL: http://localhost:3000/pagos/tutor/:id
  @Get('tutor/:id')
  async getPagoByTutorId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Pago[]> {
    try {
      return await this.pagosService.getPagoByTutorId(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los pagos por ID de tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **PATCH**
  // URL: http://localhost:3000/pagos/:id
  @Patch(':id')
  async updatePago(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePagoDto: UpdatePagoDto,
  ): Promise<Pago> {
    try {
      const updatedPago = await this.pagosService.updatePago(id, updatePagoDto);
      if (!updatedPago) {
        throw new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
      }
      return updatedPago;
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al actualizar el pago',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **DELETE**
  // URL: http://localhost:3000/pagos/:id
  @Delete(':id')
  async deletePago(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.pagosService.deletePago(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al eliminar el pago',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
