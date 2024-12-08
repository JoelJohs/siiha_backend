/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioDocente } from './usuario_docente.entity';
import { CreateUsuarioDocenteDto } from './dto/create-usuario-docente.dto';
import { UpdateUsuarioDocenteDto } from './dto/update-usuario-docente.dto';

@Injectable()
export class UsuarioDocenteService {
  constructor(
    @InjectRepository(UsuarioDocente)
    private userDocenteRepository: Repository<UsuarioDocente>,
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

  // **Create Usuario Docente**
  async createUserDocente(
    createUsuarioDocenteDto: CreateUsuarioDocenteDto,
  ): Promise<UsuarioDocente> {
    try {
      const newUserDocente = this.userDocenteRepository.create(
        createUsuarioDocenteDto,
      );
      return await this.userDocenteRepository.save(newUserDocente);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'El usuario docente ya existe',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Error al crear el usuario docente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Usuarios Docentes**
  async getUserDocente(): Promise<UsuarioDocente[]> {
    try {
      return await this.userDocenteRepository.find({
        relations: ['docente', 'grupos'],
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los usuarios docentes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Usuario Docente por ID**
  async getUserDocenteById(id: number): Promise<UsuarioDocente> {
    try {
      const userDocente = await this.userDocenteRepository.findOne({
        where: { id_usuario: id },
        relations: ['docente', 'grupos'],
      });

      if (!userDocente) {
        throw new HttpException(
          'Usuario docente no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      return userDocente;
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al obtener el usuario docente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Usuario Docente por Nombre de Usuario**
  async getUserDocenteByUsername(username: string): Promise<UsuarioDocente> {
    try {
      const userDocente = await this.userDocenteRepository.findOne({
        where: { nombre_usuario: username },
        relations: ['docente', 'grupos'],
      });

      if (!userDocente) {
        throw new HttpException(
          'Usuario docente no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      return userDocente;
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al obtener el usuario docente por nombre de usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Get Usuario Docente por Email**
  async getUserDocenteByEmail(email: string): Promise<UsuarioDocente> {
    try {
      const userDocente = await this.userDocenteRepository.findOne({
        where: { email: email },
        relations: ['docente', 'grupos'],
      });

      if (!userDocente) {
        throw new HttpException(
          'Usuario docente no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      return userDocente;
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }
      throw new HttpException(
        'Error al obtener el usuario docente por email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Update Usuario Docente**
  async updateUserDocente(
    id: number,
    updateUsuarioDocenteDto: UpdateUsuarioDocenteDto,
  ): Promise<UsuarioDocente> {
    try {
      const userDocente = await this.userDocenteRepository.preload({
        id_usuario: id,
        ...updateUsuarioDocenteDto,
      });

      if (!userDocente) {
        throw new HttpException(
          'Usuario docente no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      return await this.userDocenteRepository.save(userDocente);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'El username ya está en uso',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Error al actualizar el usuario docente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // **Delete Usuario Docente**
  async deleteUserDocente(id: number): Promise<void> {
    try {
      const result = await this.userDocenteRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException(
          'Usuario docente no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al eliminar el usuario docente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
