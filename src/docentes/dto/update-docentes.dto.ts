/* eslint-disable prettier/prettier */
// src/docentes/dto/update-docente.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateDocenteDto } from './create-docente.dto';

export class UpdateDocenteDto extends PartialType(CreateDocenteDto) {}
