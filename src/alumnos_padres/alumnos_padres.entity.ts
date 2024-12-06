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

  @ManyToOne(() => Alumno, (alumno) => alumno.alumnoUsuarioPadres, {
    nullable: false,
  })
  alumno: Alumno;

  @ManyToOne(
    () => UsuarioPadre,
    (usuarioPadre) => usuarioPadre.alumnoUsuarioPadres,
    { nullable: false },
  )
  usuario_padre: UsuarioPadre;
}
