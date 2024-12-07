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
import { GruposService } from './grupos.service';
import { Grupo } from './grupos.entity';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { CreateGrupoDto } from './dto/create-grupo.dto';

@Controller('grupos')
export class GruposController {
  constructor(private gruposService: GruposService) {}

  // **POST**
  // URL: http://localhost:3000/grupos
  @Post()
  async createGrupo(@Body() createGrupoDto: CreateGrupoDto): Promise<Grupo> {
    try {
      return await this.gruposService.createGrupo(createGrupoDto);
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al crear el grupo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **GET**
  // URL: http://localhost:3000/grupos
  @Get()
  async getGrupos(): Promise<Grupo[]> {
    try {
      return await this.gruposService.getGrupos();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los grupos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // URL: http://localhost:3000/grupos/details
  @Get('details')
  async getGrupoWithDetails(): Promise<Grupo[]> {
    try {
      return await this.gruposService.getGrupoWithDetails();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los grupos con detalles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // URL: http://localhost:3000/grupos/:id
  @Get(':id')
  async getGrupoById(@Param('id', ParseIntPipe) id: number): Promise<Grupo> {
    try {
      const grupo = await this.gruposService.getGrupoById(id);
      if (!grupo) {
        throw new HttpException('Grupo no encontrado', HttpStatus.NOT_FOUND);
      }
      return grupo;
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al obtener el grupo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **PATCH**
  // URL: http://localhost:3000/grupos/:id
  @Patch(':id')
  async updateGrupo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGrupoDto: UpdateGrupoDto,
  ): Promise<Grupo> {
    try {
      const updatedGrupo = await this.gruposService.updateGrupo(
        id,
        updateGrupoDto,
      );
      if (!updatedGrupo) {
        throw new HttpException('Grupo no encontrado', HttpStatus.NOT_FOUND);
      }
      return updatedGrupo;
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al actualizar el grupo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **DELETE**
  // URL: http://localhost:3000/grupos/:id
  @Delete(':id')
  async deleteGrupo(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.gruposService.deleteGrupo(id);
    } catch (error) {
      if (error.status && error.message) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Error al eliminar el grupo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
