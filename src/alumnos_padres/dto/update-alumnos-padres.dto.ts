/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnoUsuarioPadreDto } from './create-alumnos-padres.dto';

export class UpdateAlumnoUsuarioPadreDto extends PartialType(
  CreateAlumnoUsuarioPadreDto,
) {}
