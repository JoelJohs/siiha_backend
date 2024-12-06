/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PadreTutorService } from './padre_tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dts';

@Controller('padre-tutor')
export class PadreTutorController {
  constructor(private padreTutorService: PadreTutorService) {}

  @Get()
  getTutor() {
    return this.padreTutorService.getTutor();
  }

  @Post()
  createTutor(@Body() newTutor: CreateTutorDto) {
    return this.padreTutorService.createTutor(newTutor);
  }
}
