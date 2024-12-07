/* eslint-disable prettier/prettier */
// src/padre_tutor/dto/update-tutor.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateTutorDto } from './create-tutor.dts';

export class UpdateTutorDto extends PartialType(CreateTutorDto) {}
