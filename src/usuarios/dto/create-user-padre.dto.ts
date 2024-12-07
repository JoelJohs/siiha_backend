/* eslint-disable prettier/prettier */
// src/usuarios/dto/create-user-padre.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';

export class CreateUsuarioPadreDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  nombre_usuario: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  contrasena: string;

  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @IsInt()
  @Min(1, { message: 'El ID del padre tutor debe ser un número positivo' })
  padre_tutor_id: number;

  @IsEnum(['T', 'A'], { message: 'El rol debe ser "T" o "A"' })
  rol: 'T' | 'A';
}
