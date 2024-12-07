/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './pagos.entity';
import { Repository } from 'typeorm';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pagos.dto';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago) private pagoRepository: Repository<Pago>,
  ) {}

  // **Create Pago**
  async createPago(createPagoDto: CreatePagoDto): Promise<Pago> {
    try {
      const newPago = this.pagoRepository.create(createPagoDto);
      return await this.pagoRepository.save(newPago);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('El pago ya existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Error al crear el pago',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Pagos**
  async getPagos(): Promise<Pago[]> {
    try {
      return await this.pagoRepository.find();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al obtener los pagos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Pagos con Detalles**
  async getAllPagosWithDetails(): Promise<Pago[]> {
    try {
      return await this.pagoRepository.find({
        relations: [
          'tutorHasPagos',
          'tutorHasPagos.usuario_padre',
          'tutorHasPagos.usuario_padre.padre_tutor',
        ],
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al obtener los pagos con detalles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Pago por ID de Tutor**
  async getPagoByTutorId(tutorId: number): Promise<Pago[]> {
    try {
      return await this.pagoRepository.find({
        where: { tutorHasPagos: { usuario_padre: { id_usuario_padre: tutorId } } },
        relations: ['tutorHasPagos', 'tutorHasPagos.usuario_padre'],
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al obtener los pagos por ID de tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Update Pago**
  async updatePago(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    try {
      const pago = await this.pagoRepository.preload({
        id_pago: id,
        ...updatePagoDto,
      });

      if (!pago) {
        throw new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
      }

      return await this.pagoRepository.save(pago);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('El pago ya está en uso', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Error al actualizar el pago',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Delete Pago**
  async deletePago(id: number): Promise<void> {
    try {
      const result = await this.pagoRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al eliminar el pago',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
