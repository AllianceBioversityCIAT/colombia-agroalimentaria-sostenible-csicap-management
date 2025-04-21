import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizacione } from '../organizaciones/entities/organizacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organizacione])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
