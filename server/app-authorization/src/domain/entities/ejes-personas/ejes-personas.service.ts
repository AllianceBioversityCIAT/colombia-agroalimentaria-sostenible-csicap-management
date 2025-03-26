import { Injectable } from '@nestjs/common';
import { CreateEjesPersonaDto } from './dto/create-ejes-persona.dto';
import { UpdateEjesPersonaDto } from './dto/update-ejes-persona.dto';

@Injectable()
export class EjesPersonasService {
  create(createEjesPersonaDto: CreateEjesPersonaDto) {
    return 'This action adds a new ejesPersona';
  }

  findAll() {
    return `This action returns all ejesPersonas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ejesPersona`;
  }

  update(id: number, updateEjesPersonaDto: UpdateEjesPersonaDto) {
    return `This action updates a #${id} ejesPersona`;
  }

  remove(id: number) {
    return `This action removes a #${id} ejesPersona`;
  }
}
