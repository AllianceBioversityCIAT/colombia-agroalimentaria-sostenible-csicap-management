import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { RolesPersonasModule } from '../roles-personas/roles-personas.module';
import { EjesPersonasModule } from '../ejes-personas/ejes-personas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizacione } from '../organizaciones/entities/organizacione.entity';
import { UtilsModule } from '../../tools/AWS/utils/utils.module';

@Module({
  controllers: [PersonasController],
  imports: [
    RolesPersonasModule,
    EjesPersonasModule,
    TypeOrmModule.forFeature([Organizacione]),
    UtilsModule,
  ],
  providers: [PersonasService],
  exports: [PersonasService],
})
export class PersonasModule {}
