/* eslint-disable prettier/prettier */
// alumnos/dto/create-alumno.dto.ts

import { IsString, IsOptional, IsInt, IsDateString } from 'class-validator';

export class CreateAlumnoDto {
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
  curp?: string;

  @IsString()
  @IsOptional()
  cartilla_vacunacion?: string;

  @IsString()
  @IsOptional()
  historial_medico?: string;

  @IsString()
  @IsOptional()
  datos_seguro_social?: string;

  @IsDateString()
  @IsOptional()
  fecha_inscripcion?: string;

  @IsInt()
  @IsOptional()
  egreso?: number;

  @IsDateString()
  @IsOptional()
  fecha_egreso?: string;

  @IsInt()
  @IsOptional()
  baja?: number;

  @IsDateString()
  @IsOptional()
  fecha_baja?: string;

  @IsInt()
  @IsOptional()
  grupoIdGrupo?: number;

  @IsInt()
  @IsOptional()
  padreTutorIdPadreTutor?: number;
}
