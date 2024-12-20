/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Grupo } from 'src/grupos/grupos.entity';
import { AlumnoUsuarioPadre } from 'src/alumnos_padres/alumnos_padres.entity';

@Entity('alumnos')
export class Alumno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60, nullable: true })
  nombres: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  apellido_paterno: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  apellido_materno: string;

  @Column({ type: 'varchar', length: 18, unique: true, nullable: true })
  curp: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cartilla_vacunacion: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  historial_medico: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  datos_seguro_social: string;

  @Column({ type: 'datetime', nullable: true })
  fecha_inscripcion: Date;

  @Column({ type: 'tinyint', nullable: true })
  egreso: number;

  @Column({ type: 'datetime', nullable: true })
  fecha_egreso: Date;

  @Column({ type: 'tinyint', nullable: true })
  baja: number;

  @Column({ type: 'datetime', nullable: true })
  fecha_baja: Date;

  @ManyToOne(() => Grupo, (grupo) => grupo.alumnos, { nullable: true })
  grupo: Grupo;

  @OneToMany(
    () => AlumnoUsuarioPadre,
    (alumnoUsuarioPadre) => alumnoUsuarioPadre.alumno,
  )
  alumnoUsuarioPadres: AlumnoUsuarioPadre[];

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;
}
