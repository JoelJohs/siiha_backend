/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Docente } from 'src/docentes/docentes.entity';
import { Grupo } from 'src/grupos/grupos.entity';

@Entity('usuarios_docentes')
export class UsuarioDocente {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 45, unique: true, nullable: false })
  nombre_usuario: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  contrasena: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  email: string;

  @ManyToOne(() => Docente, { nullable: false })
  docente: Docente;

  @OneToMany(() => Grupo, (grupo) => grupo.usuario_docente)
  grupos: Grupo[];

  @Column({ type: 'enum', enum: ['D', 'A'], default: 'D' })
  rol: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;
}
