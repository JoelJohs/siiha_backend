/* eslint-disable prettier/prettier */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioDocenteService } from 'src/usuario_docente/usuario_docente.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { RegisterPadreDto } from './dto/registerPadre.dto';
import { RegisterDocenteDto } from './dto/RegisterDocente.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioPadreService: UsuariosService,
    private readonly usuarioDocenteService: UsuarioDocenteService,
    private readonly jwtService: JwtService,
  ) {}

  async registerPadre(registerDto: RegisterPadreDto) {
    const userUsername = await this.usuarioPadreService.getUserPadreByUsername(
      registerDto.nombre_usuario,
    );

    if (userUsername) {
      return {
        message: 'El nombre de usuario ya existe',
      };
    }

    return await this.usuarioPadreService.createUserPadre(registerDto);
  }

  async registerDocente(registerDocenteDto: RegisterDocenteDto) {
    const userUsername =
      await this.usuarioDocenteService.getUserDocenteByUsername(
        registerDocenteDto.nombre_usuario,
      );

    if (userUsername) {
      return {
        message: 'El nombre de usuario ya existe',
      };
    }
    return await this.usuarioDocenteService.createUserDocente(
      registerDocenteDto,
    );
  }

  async loginPadre(loginPadreDto) {
    const user = await this.usuarioPadreService.getUserPadreByUsername(
      loginPadreDto.nombre_usuario,
    );

    if (!user) {
      throw new UnauthorizedException('El usuario no existe');
    }

    const isPasswordValid = await this.usuarioPadreService.validatePassword(
      user.contrasena,
      loginPadreDto.contrasena,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = {
      username: user.nombre_usuario,
      sub: user.id_usuario_padre,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      user,
    };
  }

  async loginDocente(loginDocenteDto) {
    const user = await this.usuarioDocenteService.getUserDocenteByUsername(
      loginDocenteDto.nombre_usuario,
    );

    if (!user) {
      throw new UnauthorizedException('El usuario no existe');
    }

    const isPasswordValid = await this.usuarioDocenteService.validatePassword(
      user.contrasena,
      loginDocenteDto.contrasena,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = {
      username: user.nombre_usuario,
      sub: user.id_usuario,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      user,
    };
  }
}
