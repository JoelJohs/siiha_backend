/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PadreTutorService } from './padre_tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dts';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { PadreTutor } from './padre_tutor.entity';

@Controller('padre-tutor')
export class PadreTutorController {
  constructor(private padreTutorService: PadreTutorService) {}

  // **Create Tutor**
  // URL: POST http://localhost:3000/padre-tutor
  @Post()
  async createTutor(
    @Body() createTutorDto: CreateTutorDto,
  ): Promise<PadreTutor> {
    try {
      return await this.padreTutorService.createTutor(createTutorDto);
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al crear el tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Tutores**
  // URL: GET http://localhost:3000/padre-tutor
  @Get()
  async getTutores(): Promise<PadreTutor[]> {
    try {
      return await this.padreTutorService.getTutores();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los tutores',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Tutor por ID**
  // URL: GET http://localhost:3000/padre-tutor/:id
  @Get(':id')
  async getTutorById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PadreTutor> {
    try {
      return await this.padreTutorService.getTutorById(id);
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al obtener el tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Update Tutor**
  // URL: PATCH http://localhost:3000/padre-tutor/:id
  @Patch(':id')
  async updateTutor(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTutorDto: UpdateTutorDto,
  ): Promise<PadreTutor> {
    try {
      const updatedTutor = await this.padreTutorService.updateTutor(
        id,
        updateTutorDto,
      );
      if (!updatedTutor) {
        throw new HttpException('Tutor no encontrado', HttpStatus.NOT_FOUND);
      }
      return updatedTutor;
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al actualizar el tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Delete Tutor**
  // URL: DELETE http://localhost:3000/padre-tutor/:id
  @Delete(':id')
  async deleteTutor(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.padreTutorService.deleteTutor(id);
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al eliminar el tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
