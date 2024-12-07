/* eslint-disable prettier/prettier */
// src/docentes/dto/create-docente.dto.ts

import {
  IsString,
  IsOptional,
  IsEmail,
  IsNotEmpty,
  IsUrl,
  Matches,
} from 'class-validator';

export class CreateDocenteDto {
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellido_paterno: string;

  @IsString()
  @IsOptional()
  apellido_materno: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{2}\d{2}$/, {
    message: 'RFC no válido',
  })
  rfc: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{10,15}$/, {
    message: 'El teléfono debe tener entre 10 y 15 dígitos',
  })
  telefono?: string;

  @IsEmail({}, { message: 'Email no válido' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsUrl({}, { message: 'URL de imagen no válida' })
  @IsOptional()
  imagen?: string;
}
