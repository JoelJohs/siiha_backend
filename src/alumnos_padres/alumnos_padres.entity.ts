/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Alumno } from 'src/alumnos/alumnos.entity';
import { UsuarioPadre } from 'src/usuarios/usuarios.entity';

@Entity('alumno_padre')
export class AlumnoUsuarioPadre {
  @PrimaryColumn()
  alumno_id: number;

  @PrimaryColumn()
  usuario_padre_id: number;

  @ManyToOne(() => Alumno, { nullable: false })
  alumno: Alumno;

  @ManyToOne(() => UsuarioPadre, { nullable: false })
  usuario_padre: UsuarioPadre;
}
