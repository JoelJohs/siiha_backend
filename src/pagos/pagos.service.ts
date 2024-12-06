/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './pagos.entity';
import { Repository } from 'typeorm';
import { CreatePagoDto } from './dto/create-pago.dto';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago) private pagoRepository: Repository<Pago>,
  ) {}

  createPago(pago: CreatePagoDto): Promise<Pago> {
    const newPago = this.pagoRepository.create(pago);
    return this.pagoRepository.save(newPago);
  }

  getPagos() {
    return this.pagoRepository.find();
  }

  getPagoByTutorId(tutorId: number) {
    return this.pagoRepository.find({
      where: { tutorHasPagos: { usuario_padre: { id_usuario_padre: tutorId } } },
      relations: ['tutorHasPagos', 'tutorHasPagos.usuario_padre'],
    });
  }

  getAllPagosWithDetails(){
    return this.pagoRepository.find({
      relations: ['tutorHasPagos', 'tutorHasPagos.usuario_padre', 'tutorHasPagos.usuario_padre.padre_tutor'],
    })
  }

}
