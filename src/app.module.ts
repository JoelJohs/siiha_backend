/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PadreTutorModule } from './padre_tutor/padre_tutor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnosModule } from './alumnos/alumnos.module';
import { GruposModule } from './grupos/grupos.module';
import { DocentesModule } from './docentes/docentes.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PagosModule } from './pagos/pagos.module';
import { UsuarioDocenteModule } from './usuario_docente/usuario_docente.module';
import { PadreTutorHasPagosModule } from './padre_tutor_has_pagos/padre_tutor_has_pagos.module';
import { AlumnosPadresModule } from './alumnos_padres/alumnos_padres.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'siiha_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PadreTutorModule,
    AlumnosModule,
    GruposModule,
    DocentesModule,
    UsuariosModule,
    PagosModule,
    UsuarioDocenteModule,
    PadreTutorHasPagosModule,
    AlumnosPadresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
