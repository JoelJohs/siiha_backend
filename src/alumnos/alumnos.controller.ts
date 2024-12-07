/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { Alumno } from './alumnos.entity';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Controller('alumnos')
export class AlumnosController {
  constructor(private alumnosService: AlumnosService) {}

  //** GET **//

  // URL: http://localhost:3000/alumnos
  @Get()
  async getAlumnos(): Promise<Alumno[]> {
    try {
      return await this.alumnosService.getAlumnos();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al obtener los alumnos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // URL: http://localhost:3000/alumnos/padres
  @Get('padres')
  async getAlumnosConPadres(): Promise<Alumno[]> {
    try {
      return await this.alumnosService.getAlumnoWithPadre();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al obtener los alumnos con padres',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // URL: http://localhost:3000/alumnos/details
  @Get('details')
  async getAlumnoWithDetails(): Promise<Alumno[]> {
    try {
      return await this.alumnosService.getAlumnosWithDetails();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al obtener los detalles de los alumnos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // URL: http://localhost:3000/alumnos/1
  @Get(':id')
  async getAlumno(@Param('id', ParseIntPipe) id: number): Promise<Alumno> {
    try {
      return await this.alumnosService.getAlumno(id);
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al obtener el alumno',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **POST**
  // URL: http://localhost:3000/alumnos
  @Post()
  async createAlumno(@Body() newAlumno: CreateAlumnoDto): Promise<Alumno> {
    try {
      return await this.alumnosService.createAlumno(newAlumno);
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al crear el alumno',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **PUT**
  // URL: http://localhost:3000/alumnos/update/1
  @Patch('update/:id')
  async updateAlumno(
    @Param('id', ParseIntPipe) id: number,
    @Body() alumno: UpdateAlumnoDto,
  ): Promise<Alumno> {
    try {
      const updatedAlumno = await this.alumnosService.updateAlumno(id, alumno);
      if (!updatedAlumno) {
        throw new HttpException('Alumno no encontrado', HttpStatus.NOT_FOUND);
      }
      return updatedAlumno;
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al actualizar el alumno',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **DELETE**
  // URL: http://localhost:3000/alumnos/delete/1
  @Delete('delete/:id')
  async deleteAlumno(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      const result = await this.alumnosService.deleteAlumno(id);
      if (result.affected === 0) {
        throw new HttpException('Alumno no encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al eliminar el alumno',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
