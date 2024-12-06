import { Module } from '@nestjs/common';
import { AlumnosPadresService } from './alumnos_padres.service';
import { AlumnosPadresController } from './alumnos_padres.controller';

@Module({
  providers: [AlumnosPadresService],
  controllers: [AlumnosPadresController]
})
export class AlumnosPadresModule {}
