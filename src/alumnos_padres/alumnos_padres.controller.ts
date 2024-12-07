/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AlumnosPadresService } from './alumnos_padres.service';
import { AlumnoUsuarioPadre } from './alumnos_padres.entity';
import { UpdateAlumnoUsuarioPadreDto } from './dto/update-alumnos-padres.dto';
import { CreateAlumnoUsuarioPadreDto } from './dto/create-alumnos-padres.dto';

@Controller('alumnos-padres')
export class AlumnosPadresController {
  constructor(private alumnosPadresService: AlumnosPadresService) {}

  // Crear una nueva relación
  @Post()
  async createRelacion(
    @Body() createDto: CreateAlumnoUsuarioPadreDto,
  ): Promise<AlumnoUsuarioPadre> {
    try {
      return await this.alumnosPadresService.createRelacion(
        createDto.alumno_id,
        createDto.usuario_padre_id,
      );
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al crear la relación entre alumno y padre',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Obtener todas las relaciones
  @Get()
  async getRelaciones(): Promise<AlumnoUsuarioPadre[]> {
    try {
      return await this.alumnosPadresService.getRelaciones();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener las relaciones',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Actualizar una relación
  @Patch(':alumno_id/:usuario_padre_id')
  async updateRelacion(
    @Param('alumno_id', ParseIntPipe) alumnoId: number,
    @Param('usuario_padre_id', ParseIntPipe) usuarioPadreId: number,
    @Body() updateDto: UpdateAlumnoUsuarioPadreDto,
  ): Promise<AlumnoUsuarioPadre> {
    try {
      const updatedRelacion = await this.alumnosPadresService.updateRelacion(
        alumnoId,
        usuarioPadreId,
        updateDto,
      );
      if (!updatedRelacion) {
        throw new HttpException('Relación no encontrada', HttpStatus.NOT_FOUND);
      }
      return updatedRelacion;
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al actualizar la relación',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Eliminar una relación
  @Delete(':id')
  async deleteRelacion(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.alumnosPadresService.deleteRelacion(id);
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al eliminar la relación',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
