import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { RolesPersonasModule } from '../roles-personas/roles-personas.module';

@Module({
  controllers: [PersonasController],
  imports: [RolesPersonasModule],
  providers: [PersonasService],
  exports: [PersonasService],
})
export class PersonasModule {}
