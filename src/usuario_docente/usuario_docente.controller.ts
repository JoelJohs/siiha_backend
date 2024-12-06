/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioDocenteService } from './usuario_docente.service';
import { CreateUsuarioDocenteDto } from './dto/create-usuario-docente.dto';

@Controller('usuario-docente')
export class UsuarioDocenteController {
  constructor(private usuarioDocenteService: UsuarioDocenteService) {}

  @Get()
  getUserDocente() {
    return this.usuarioDocenteService.getUserDocente();
  }

  @Post()
  createUserDocente(@Body() newUserDocente: CreateUsuarioDocenteDto) {
    return this.usuarioDocenteService.createUserDocente(newUserDocente);
  }
}
