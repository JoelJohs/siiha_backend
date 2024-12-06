/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { AlumnosController } from './alumnos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumno } from './alumnos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alumno])],
  providers: [AlumnosService],
  controllers: [AlumnosController],
})
export class AlumnosModule {}
