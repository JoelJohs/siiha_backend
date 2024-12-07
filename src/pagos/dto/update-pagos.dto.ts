/* eslint-disable prettier/prettier */
// src/pagos/dto/update-pago.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreatePagoDto } from './create-pago.dto';
import { IsOptional, IsNumber, IsDate, Min } from 'class-validator';

export class UpdatePagoDto extends PartialType(CreatePagoDto) {
  @IsOptional()
  @IsDate()
  fecha_limite_pago?: Date;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cantidad?: number;
}