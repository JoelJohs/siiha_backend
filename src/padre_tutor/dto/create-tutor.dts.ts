/* eslint-disable prettier/prettier */
// src/padre_tutor/dto/create-tutor.dto.ts

import {
  IsString,
  IsOptional,
  IsEmail,
  Matches,
  Length,
} from 'class-validator';

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

  @IsOptional()
  @IsString()
  @Length(0, 13)
  rfc: string;

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

  @IsOptional()
  @IsString()
  @Length(0, 255)
  imagen_ine: string; // Remove any additional validation decorators here
}
