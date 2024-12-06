/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { UsuarioPadre } from 'src/usuarios/usuarios.entity';
import { Pago } from 'src/pagos/pagos.entity';

@Entity('tutor_has_pagos')
export class PadreTutorHasPagos {
  @PrimaryColumn()
  padre_tutor_id_padre_tutor: number;

  @PrimaryColumn()
  pagos_id_pago: number;

  @ManyToOne(() => UsuarioPadre, (usuarioPadre) => usuarioPadre.tutorHasPagos, {
    nullable: false,
  })
  usuario_padre: UsuarioPadre;

  @ManyToOne(() => Pago, (pago) => pago.tutorHasPagos, { nullable: false })
  pago: Pago;

  @Column({ type: 'tinyint', nullable: true })
  estado_pago: number;

  @Column({ type: 'text', nullable: true })
  comentarios: string;
}
