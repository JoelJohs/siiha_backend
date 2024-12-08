/* eslint-disable prettier/prettier */
// src/auth/dto/login.dto.ts

import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDocenteDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  nombre_usuario: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  contrasena: string;

  // @IsEmail({}, { message: 'El email debe ser válido' })
  // @IsNotEmpty({ message: 'El email es obligatorio' })
  // email: string;
}
