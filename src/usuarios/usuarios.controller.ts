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
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioPadreDto } from './dto/create-user-padre.dto';
import { UsuarioPadre } from './usuarios.entity';
import { UpdateUsuarioPadreDto } from './dto/update-user-padre.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  // **GET**
  // URL: http://localhost:3000/usuarios
  @Get()
  async getUsuarios(): Promise<UsuarioPadre[]> {
    try {
      return await this.usuariosService.getUserPadre();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al obtener los usuarios',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // URL: http://localhost:3000/usuarios/:id
  @Get(':id')
  async getUsuario(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UsuarioPadre> {
    try {
      return await this.usuariosService.getUserPadreById(id);
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al obtener el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **GET** usuario por nombre de usuario
  // URL: http://localhost:3000/usuarios/username/:username
  @Get('username/:username')
  async getUsuarioByUsername(
    @Param('username') username: string,
  ): Promise<UsuarioPadre> {
    try {
      return await this.usuariosService.getUserPadreByUsername(username);
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al obtener el usuario por nombre de usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **GET** usuario por email
  // URL: http://localhost:3000/usuarios/email/:email
  @Get('email/:email')
  async getUsuarioByEmail(
    @Param('email') email: string,
  ): Promise<UsuarioPadre> {
    try {
      return await this.usuariosService.getUserPadreByEmail(email);
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al obtener el usuario por email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **POST**
  // URL: http://localhost:3000/usuarios
  @Post()
  async createUsuario(
    @Body() newUser: CreateUsuarioPadreDto,
  ): Promise<UsuarioPadre> {
    try {
      return await this.usuariosService.createUserPadre(newUser);
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al crear el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **PATCH**
  // URL: http://localhost:3000/usuarios/update/:id
  @Patch('update/:id')
  async updateUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUsuarioPadreDto,
  ): Promise<UsuarioPadre> {
    try {
      const updatedUsuario = await this.usuariosService.updateUserPadre(
        id,
        updateUser,
      );
      if (!updatedUsuario) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      return updatedUsuario;
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al actualizar el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **DELETE**
  // URL: http://localhost:3000/usuarios/delete/:id
  @Delete('delete/:id')
  async deleteUsuario(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.usuariosService.deleteUserPadre(id);
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al eliminar el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
