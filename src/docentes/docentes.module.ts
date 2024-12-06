import { Module } from '@nestjs/common';
import { DocentesController } from './docentes.controller';
import { DocentesService } from './docentes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docente } from './docentes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Docente])],
  controllers: [DocentesController],
  providers: [DocentesService],
})
export class DocentesModule {}
