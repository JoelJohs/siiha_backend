/* eslint-disable prettier/prettier */
// src/usuario_docente/dto/create-usuario-docente.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  IsEmail,
} from 'class-validator';

export class CreateUsuarioDocenteDto {
  @IsString()
  @IsNotEmpty({ message: 'El username es obligatorio' })
  nombre_usuario: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  contrasena: string;

  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @IsInt()
  @Min(1, { message: 'El ID del docente debe ser un número positivo' })
  docente_id: number;

  @IsOptional()
  @IsEnum(['D', 'A'], { message: 'El rol debe ser D o A' })
  rol?: 'D' | 'A' = 'D';
}
