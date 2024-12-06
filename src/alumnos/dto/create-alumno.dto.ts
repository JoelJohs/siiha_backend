/* eslint-disable prettier/prettier */

export class CreateAlumnoDto {
  nombres?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  curp?: string;
  cartilla_vacunacion?: string;
  historial_medico?: string;
  datos_seguro_social?: string;
  fecha_inscripcion?: Date;
  egreso?: number;
  fecha_egreso?: Date;
  baja?: number;
  fecha_baja?: Date;
  padre_tutor_id_padre_tutor: number;
  grupo_id_grupo: number;
}
