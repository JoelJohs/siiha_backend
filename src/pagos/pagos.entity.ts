/* eslint-disable prettier/prettier */
import { PadreTutorHasPagos } from 'src/padre_tutor_has_pagos/padre_tutor_has_pagos.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id_pago: number;

  @Column({ type: 'datetime', nullable: true })
  fecha_limite_pago: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  cantidad: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @OneToMany(() => PadreTutorHasPagos, (tutorHasPagos) => tutorHasPagos.pago)
  tutorHasPagos: PadreTutorHasPagos[];
}
