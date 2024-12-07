/* eslint-disable prettier/prettier */
// src/usuario_docente/dto/update-usuario-docente.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDocenteDto } from './create-usuario-docente.dto';
import { IsString, IsOptional, IsEnum, IsInt, Min } from 'class-validator';

export class UpdateUsuarioDocenteDto extends PartialType(
  CreateUsuarioDocenteDto,
) {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsInt()
  @Min(1, { message: 'El ID del docente debe ser un número positivo' })
  docente_id?: number;

  @IsOptional()
  @IsEnum(['D', 'A'], { message: 'El rol debe ser D o A' })
  rol?: 'D' | 'A';
}
