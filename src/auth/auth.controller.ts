/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterPadreDto } from './dto/registerPadre.dto';
import { RegisterDocenteDto } from './dto/RegisterDocente.dto';
import { LoginPadreDto } from './dto/loginPadre.dto';
import { LoginDocenteDto } from './dto/loginDocente.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/padre')
  registerPadre(@Body() registerPadreDto: RegisterPadreDto) {
    return this.authService.registerPadre(registerPadreDto);
  }

  @Post('register/docente')
  registerDocente(@Body() registerDocenteDto: RegisterDocenteDto) {
    return this.authService.registerDocente(registerDocenteDto);
  }

  @Post('login/padre')
  async loginPadre(@Body() loginPadreDto: LoginPadreDto) {
    return this.authService.loginPadre(loginPadreDto);
  }

  @Post('login/docente')
  async loginDocente(@Body() loginDocenteDto: LoginDocenteDto) {
    return this.authService.loginDocente(loginDocenteDto);
  }
}
