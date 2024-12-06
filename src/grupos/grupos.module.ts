import { Module } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from './grupos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grupo])],
  providers: [GruposService],
  controllers: [GruposController],
})
export class GruposModule {}
