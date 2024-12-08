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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USERNAME'),
        password: '',
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // **¡Usa synchronize: false en producción!**
      }),
      inject: [ConfigService],
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
