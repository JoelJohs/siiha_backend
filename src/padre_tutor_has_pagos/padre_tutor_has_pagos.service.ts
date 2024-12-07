/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PadreTutorHasPagos } from './padre_tutor_has_pagos.entity';
import { Repository } from 'typeorm';
import { CreateTutorPagoDto } from './dto/create-tutor-pago.dto';
import { UpdateTutorPagoDto } from './dto/update-tutor-pago.dto';

@Injectable()
export class PadreTutorHasPagosService {
  constructor(
    @InjectRepository(PadreTutorHasPagos)
    private padrePagosRepository: Repository<PadreTutorHasPagos>,
  ) {}

  // **Create Tutor Pago**
  async createPadrePago(createTutorPagoDto: CreateTutorPagoDto): Promise<PadreTutorHasPagos> {
    try {
      const newPadrePago = this.padrePagosRepository.create(createTutorPagoDto);
      return await this.padrePagosRepository.save(newPadrePago);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('El pago para este tutor ya existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Error al crear el pago del tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Tutor Pagos**
  async getTutorPagos(): Promise<PadreTutorHasPagos[]> {
    try {
      return await this.padrePagosRepository.find({
        relations: ['usuario_padre', 'pago'],
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al obtener los pagos de tutores',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Tutor Pago por ID**
  async getTutorPagoById(
    padre_tutor_id_padre_tutor: number,
    pagos_id_pago: number,
  ): Promise<PadreTutorHasPagos> {
    try {
      const tutorPago = await this.padrePagosRepository.findOne({
        where: { padre_tutor_id_padre_tutor, pagos_id_pago },
        relations: ['usuario_padre', 'pago'],
      });
      if (!tutorPago) {
        throw new HttpException('Pago de tutor no encontrado', HttpStatus.NOT_FOUND);
      }
      return tutorPago;
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

  // **Update Tutor Pago**
  async updateTutorPago(
    padre_tutor_id_padre_tutor: number,
    pagos_id_pago: number,
    updateTutorPagoDto: UpdateTutorPagoDto,
  ): Promise<PadreTutorHasPagos> {
    try {
      const tutorPagoFound = await this.padrePagosRepository.findOne({
        where: { padre_tutor_id_padre_tutor, pagos_id_pago },
      });

      if (!tutorPagoFound) {
        throw new HttpException('Pago de tutor no encontrado', HttpStatus.NOT_FOUND);
      }

      await this.padrePagosRepository.update({ padre_tutor_id_padre_tutor, pagos_id_pago }, updateTutorPagoDto);
      return await this.padrePagosRepository.findOne({
        where: { padre_tutor_id_padre_tutor, pagos_id_pago },
        relations: ['usuario_padre', 'pago'],
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('El pago para este tutor ya está en uso', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Error al actualizar el pago del tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Delete Tutor Pago**
  async deleteTutorPago(
    padre_tutor_id_padre_tutor: number,
    pagos_id_pago: number,
  ): Promise<void> {
    try {
      const result = await this.padrePagosRepository.delete({
        padre_tutor_id_padre_tutor,
        pagos_id_pago,
      });
      if (result.affected === 0) {
        throw new HttpException('Pago de tutor no encontrado', HttpStatus.NOT_FOUND);
      }
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
