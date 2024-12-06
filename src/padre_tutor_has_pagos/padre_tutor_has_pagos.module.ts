import { Module } from '@nestjs/common';
import { PadreTutorHasPagosService } from './padre_tutor_has_pagos.service';
import { PadreTutorHasPagosController } from './padre_tutor_has_pagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadreTutorHasPagos } from './padre_tutor_has_pagos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PadreTutorHasPagos])],
  providers: [PadreTutorHasPagosService],
  controllers: [PadreTutorHasPagosController],
})
export class PadreTutorHasPagosModule {}
