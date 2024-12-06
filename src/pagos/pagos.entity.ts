/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id_pago: number;

  @Column({ type: 'datetime', nullable: true })
  fecha_limite_pago: Date;

  @Column({ type: 'tinyint', nullable: true })
  pagado: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;
}
