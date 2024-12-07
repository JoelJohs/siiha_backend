/* eslint-disable prettier/prettier */
// src/padre_tutor/dto/create-tutor.dto.ts

import { IsString, IsOptional, IsEmail, Matches, IsUrl } from 'class-validator';

export class CreateTutorDto {
  @IsString()
  @IsOptional()
  nombres?: string;

  @IsString()
  @IsOptional()
  apellido_paterno?: string;

  @IsString()
  @IsOptional()
  apellido_materno?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{2}\d{2}$/, {
    message: 'RFC no válido',
  })
  rfc?: string;

  @IsString()
  @IsOptional()
  ocupacion?: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{10,15}$/, {
    message: 'El teléfono debe tener entre 10 y 15 dígitos',
  })
  telefono?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsEmail({}, { message: 'Email no válido' })
  @IsOptional()
  email?: string;

  @IsUrl({}, { message: 'URL de imagen no válida' })
  @IsOptional()
  imagen_ine?: string;
}
