/* eslint-disable prettier/prettier */
// src/usuarios/dto/update-user-padre.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioPadreDto } from './create-user-padre.dto';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';

export class UpdateUsuarioPadreDto extends PartialType(CreateUsuarioPadreDto) {
  @IsOptional()
  @IsString()
  nombre_usuario?: string;

  @IsOptional()
  @IsString()
  contrasena?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email debe ser válido' })
  email?: string;

  @IsOptional()
  @IsInt()
  @Min(1, { message: 'El ID del padre tutor debe ser un número positivo' })
  padre_tutor_id?: number;

  @IsOptional()
  @IsEnum(['T', 'A'], { message: 'El rol debe ser T o A' })
  rol?: 'T' | 'A';
}
