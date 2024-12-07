/* eslint-disable prettier/prettier */

import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateAlumnoUsuarioPadreDto {
  @IsInt()
  @IsNotEmpty()
  alumno_id: number;

  @IsInt()
  @IsNotEmpty()
  usuario_padre_id: number;
}
