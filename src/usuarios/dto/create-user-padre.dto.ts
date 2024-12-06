/* eslint-disable prettier/prettier */

export class CreateUsuarioPadreDto {
  nombre_usuario?: string;
  contrasena?: string;
  email?: string;
  padre_tutor_id?: number;
  rol?: string = 'T';
}
