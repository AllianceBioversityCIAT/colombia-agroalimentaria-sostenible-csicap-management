import { Module } from '@nestjs/common';
import { RolesPersonasService } from './roles-personas.service';
import { RolesPersonasController } from './roles-personas.controller';

@Module({
  controllers: [RolesPersonasController],
  providers: [RolesPersonasService],
  exports: [RolesPersonasService],
})
export class RolesPersonasModule {}
