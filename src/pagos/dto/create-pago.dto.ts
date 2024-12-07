/* eslint-disable prettier/prettier */
// src/pagos/dto/create-pago.dto.ts

import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreatePagoDto {
  @IsOptional()
  @IsDate()
  fecha_limite_pago?: Date;

  @IsNumber()
  @IsPositive({ message: 'La cantidad debe ser un número positivo' })
  cantidad: number;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;
}
