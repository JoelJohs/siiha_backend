import { Module } from '@nestjs/common';
import { UsuarioDocenteService } from './usuario_docente.service';
import { UsuarioDocenteController } from './usuario_docente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioDocente } from './usuario_docente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioDocente])],
  providers: [UsuarioDocenteService],
  controllers: [UsuarioDocenteController],
})
export class UsuarioDocenteModule {}
