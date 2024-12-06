/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioPadreDto } from './dto/create-user-padre.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Get()
  getUsuarios() {
    return this.usuariosService.getUserPadre();
  }

  @Post()
  createUsuario(@Body() newUser: CreateUsuarioPadreDto) {
    return this.usuariosService.createUserPadre(newUser);
  }
}
