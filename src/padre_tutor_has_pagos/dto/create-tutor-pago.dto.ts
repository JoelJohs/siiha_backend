/* eslint-disable prettier/prettier */
// src/padre_tutor_has_pagos/dto/create-tutor-pago.dto.ts

import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class CreateTutorPagoDto {
  @IsInt()
  padre_tutor_id_padre_tutor: number;

  @IsInt()
  pagos_id_pago: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  estado_pago?: number;

  @IsOptional()
  @IsString()
  comentarios?: string;
}
