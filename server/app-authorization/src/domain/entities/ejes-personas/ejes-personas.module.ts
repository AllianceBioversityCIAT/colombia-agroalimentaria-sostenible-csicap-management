import { Module } from '@nestjs/common';
import { EjesPersonasService } from './ejes-personas.service';
import { EjesPersonasController } from './ejes-personas.controller';

@Module({
  controllers: [EjesPersonasController],
  providers: [EjesPersonasService],
  exports: [EjesPersonasService],
})
export class EjesPersonasModule {}
