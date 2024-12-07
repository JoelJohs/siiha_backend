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
import { UsuarioDocenteService } from './usuario_docente.service';
import { CreateUsuarioDocenteDto } from './dto/create-usuario-docente.dto';
import { UpdateUsuarioDocenteDto } from './dto/update-usuario-docente.dto';
import { UsuarioDocente } from './usuario_docente.entity';

@Controller('usuario-docente')
export class UsuarioDocenteController {
  constructor(private usuarioDocenteService: UsuarioDocenteService) {}

  // **POST**
  // URL: http://localhost:3000/usuario-docente
  @Post()
  async createUserDocente(
    @Body() createUsuarioDocenteDto: CreateUsuarioDocenteDto,
  ): Promise<UsuarioDocente> {
    try {
      return await this.usuarioDocenteService.createUserDocente(
        createUsuarioDocenteDto,
      );
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al crear el usuario docente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **GET**
  // URL: http://localhost:3000/usuario-docente
  @Get()
  async getUserDocente(): Promise<UsuarioDocente[]> {
    try {
      return await this.usuarioDocenteService.getUserDocente();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los usuarios docentes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // URL: http://localhost:3000/usuario-docente/1
  @Get(':id')
  async getUserDocenteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UsuarioDocente> {
    try {
      return await this.usuarioDocenteService.getUserDocenteById(id);
    } catch (error) {
      throw error;
    }
  }

  // **PATCH**
  // URL: http://localhost:3000/usuario-docente/1
  @Patch(':id')
  async updateUserDocente(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDocenteDto: UpdateUsuarioDocenteDto,
  ): Promise<UsuarioDocente> {
    try {
      return await this.usuarioDocenteService.updateUserDocente(
        id,
        updateUsuarioDocenteDto,
      );
    } catch (error) {
      throw error;
    }
  }

  // **DELETE**
  // URL: http://localhost:3000/usuario-docente/1
  @Delete(':id')
  async deleteUserDocente(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    try {
      await this.usuarioDocenteService.deleteUserDocente(id);
    } catch (error) {
      throw error;
    }
  }
}
