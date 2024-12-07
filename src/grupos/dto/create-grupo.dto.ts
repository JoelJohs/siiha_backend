/* eslint-disable prettier/prettier */
// src/grupos/dto/create-grupo.dto.ts

import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateGrupoDto {
  @IsString()
  @IsNotEmpty()
  nombre_grupo: string;

  @IsInt()
  @IsNotEmpty()
  docente_id_docente: number;
}
