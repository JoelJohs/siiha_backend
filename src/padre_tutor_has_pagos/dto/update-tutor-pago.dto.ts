/* eslint-disable prettier/prettier */
// src/padre_tutor_has_pagos/dto/update-tutor-pago.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateTutorPagoDto } from './create-tutor-pago.dto';
import { IsOptional, IsInt, IsString, Min, Max } from 'class-validator';

export class UpdateTutorPagoDto extends PartialType(CreateTutorPagoDto) {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  estado_pago?: number;

  @IsOptional()
  @IsString()
  comentarios?: string;
}
