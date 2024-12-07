/* eslint-disable prettier/prettier */
// src/usuario_docente/dto/create-usuario-docente.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';

export class CreateUsuarioDocenteDto {
  @IsString()
  @IsNotEmpty({ message: 'El username es obligatorio' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;

  @IsInt()
  @Min(1, { message: 'El ID del docente debe ser un número positivo' })
  docente_id: number;

  @IsOptional()
  @IsEnum(['D', 'A'], { message: 'El rol debe ser D o A' })
  rol?: 'D' | 'A' = 'D';
}
