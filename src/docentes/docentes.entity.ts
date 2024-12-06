/* eslint-disable prettier/prettier */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('docentes')
export class Docente {
  @PrimaryGeneratedColumn()
  id_docente: number;

  @Column({ type: 'varchar', length: 60, nullable: true })
  nombres: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  apellido_paterno: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  apellido_materno: string;

  @Column({ type: 'varchar', length: 13, unique: true, nullable: true })
  rfc: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  direccion: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;
}
