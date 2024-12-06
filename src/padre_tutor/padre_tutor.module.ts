import { Module } from '@nestjs/common';
import { PadreTutorController } from './padre_tutor.controller';
import { PadreTutorService } from './padre_tutor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadreTutor } from './padre_tutor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PadreTutor])],
  controllers: [PadreTutorController],
  providers: [PadreTutorService],
})
export class PadreTutorModule {}
