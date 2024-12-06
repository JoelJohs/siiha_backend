/* eslint-disable prettier/prettier */
export class CreateUsuarioDocenteDto {
  username: string;
  password: string;
  docente_id: number;
  rol?: 'D' | 'A' = 'D';
}
