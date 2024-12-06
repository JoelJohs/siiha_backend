/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Docente } from 'src/docentes/docentes.entity';

@Entity('grupos')
export class Grupo {
  @PrimaryGeneratedColumn()
  id_grupo: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  nombre_grupo: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @ManyToOne(() => Docente, { nullable: true })
  docente: Docente;
}
