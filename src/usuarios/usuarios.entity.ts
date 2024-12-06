/* eslint-disable prettier/prettier */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { PadreTutor } from 'src/padre_tutor/padre_tutor.entity';

@Entity('usuarios_padres')
export class UsuarioPadre {
  @PrimaryGeneratedColumn()
  id_usuario_padre: number;

  @Column({ type: 'varchar', length: 60, nullable: true })
  nombre_usuario: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contrasena: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  email: string;

  @ManyToOne(() => PadreTutor, { nullable: false })
  padre_tutor: PadreTutor;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;
}
