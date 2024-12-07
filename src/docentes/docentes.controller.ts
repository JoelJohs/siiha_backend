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
import { Docente } from './docentes.entity';
import { DocentesService } from './docentes.service';
import { UpdateDocenteDto } from './dto/update-docentes.dto';
import { CreateDocenteDto } from './dto/create-docente.dto';

@Controller('docentes')
export class DocentesController {
  constructor(private docentesService: DocentesService) {}

  /**
   * Crear un nuevo docente
   * URL: POST http://localhost:3000/docentes
   */
  @Post()
  async createDocente(
    @Body() createDocenteDto: CreateDocenteDto,
  ): Promise<Docente> {
    try {
      return await this.docentesService.createDocente(createDocenteDto);
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al crear el docente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obtener todos los docentes
   * URL: GET http://localhost:3000/docentes
   */
  @Get()
  async getAllDocentes(): Promise<Docente[]> {
    try {
      return await this.docentesService.getAllDocentes();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los docentes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obtener un docente por ID
   * URL: GET http://localhost:3000/docentes/:id
   */
  @Get(':id')
  async getDocenteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Docente> {
    try {
      return await this.docentesService.getDocenteById(id);
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al obtener el docente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Actualizar un docente por ID
   * URL: PATCH http://localhost:3000/docentes/:id
   */
  @Patch(':id')
  async updateDocente(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocenteDto: UpdateDocenteDto,
  ): Promise<Docente> {
    try {
      const updatedDocente = await this.docentesService.updateDocente(
        id,
        updateDocenteDto,
      );
      if (!updatedDocente) {
        throw new HttpException('Docente no encontrado', HttpStatus.NOT_FOUND);
      }
      return updatedDocente;
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al actualizar el docente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Eliminar un docente por ID
   * URL: DELETE http://localhost:3000/docentes/:id
   */
  @Delete(':id')
  async deleteDocente(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      const result = await this.docentesService.deleteDocente(id);
      if (result.affected === 0) {
        throw new HttpException('Docente no encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al eliminar el docente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
