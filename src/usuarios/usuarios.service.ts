/* eslint-disable prettier/prettier */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioPadre } from './usuarios.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioPadreDto } from './dto/create-user-padre.dto';
import { UpdateUsuarioPadreDto } from './dto/update-user-padre.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioPadre)
    private userPadreRepository: Repository<UsuarioPadre>,
  ) {}

  // **Validate Password**
  async validatePassword(
    storedPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    try {
      return storedPassword === inputPassword;
    } catch (error) {
      console.error('Error al validar la contraseña', error);
      throw new HttpException(
        'Error al validar la contraseña',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Create UsuarioPadre**
  async createUserPadre(
    userPadre: CreateUsuarioPadreDto,
  ): Promise<UsuarioPadre> {
    try {
      const userFound = await this.userPadreRepository.findOne({
        where: { nombre_usuario: userPadre.nombre_usuario },
      });

      const emailFound = await this.userPadreRepository.findOne({
        where: { email: userPadre.email },
      });

      if (userFound) {
        throw new HttpException('Usuario ya existe', HttpStatus.CONFLICT);
      }

      if (emailFound) {
        throw new HttpException('Email ya existe', HttpStatus.CONFLICT);
      }

      const newUserPadre = this.userPadreRepository.create(userPadre);
      return await this.userPadreRepository.save(newUserPadre);
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

  // **Get UsuariosPadre**
  async getUserPadre(): Promise<UsuarioPadre[]> {
    try {
      return await this.userPadreRepository.find({
        relations: ['padre_tutor', 'alumnoUsuarioPadres', 'tutorHasPagos'],
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al obtener los usuarios',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //**Get UsuarioPadre By Username */
  async getUserPadreByUsername(username: string): Promise<UsuarioPadre> {
    try {
      const userFound = await this.userPadreRepository.findOne({
        where: { nombre_usuario: username },
        relations: ['padre_tutor', 'alumnoUsuarioPadres', 'tutorHasPagos'],
      });

      if (!userFound) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      return userFound;
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

  //** Get UsuarioPadre by email */
  async getUserPadreByEmail(email: string): Promise<UsuarioPadre> {
    try {
      const userFound = await this.userPadreRepository.findOne({
        where: { email: email },
        relations: ['padre_tutor', 'alumnoUsuarioPadres', 'tutorHasPagos'],
      });

      if (!userFound) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      return userFound;
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

  // **Get UsuarioPadre por ID**
  async getUserPadreById(id: number): Promise<UsuarioPadre> {
    try {
      const userFound = await this.userPadreRepository.findOne({
        where: { id_usuario_padre: id },
        relations: ['padre_tutor', 'alumnoUsuarioPadres', 'tutorHasPagos'],
      });

      if (!userFound) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      return userFound;
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

  // **Update UsuarioPadre**
  async updateUserPadre(
    id: number,
    updateUserPadreDto: UpdateUsuarioPadreDto,
  ): Promise<UsuarioPadre> {
    try {
      const userPadre = await this.userPadreRepository.preload({
        id_usuario_padre: id,
        ...updateUserPadreDto,
      });

      if (!userPadre) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      return await this.userPadreRepository.save(userPadre);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'El nombre de usuario o email ya está en uso',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Error al actualizar el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Delete UsuarioPadre**
  async deleteUserPadre(id: number): Promise<void> {
    try {
      const result = await this.userPadreRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al eliminar el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
