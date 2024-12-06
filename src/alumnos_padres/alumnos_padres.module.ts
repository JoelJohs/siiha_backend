import { Module } from '@nestjs/common';
import { AlumnosPadresService } from './alumnos_padres.service';
import { AlumnosPadresController } from './alumnos_padres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnoUsuarioPadre } from './alumnos_padres.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlumnoUsuarioPadre])],
  providers: [AlumnosPadresService],
  controllers: [AlumnosPadresController],
})
export class AlumnosPadresModule {}
