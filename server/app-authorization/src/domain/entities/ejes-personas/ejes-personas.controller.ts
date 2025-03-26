import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EjesPersonasService } from './ejes-personas.service';
import { CreateEjesPersonaDto } from './dto/create-ejes-persona.dto';
import { UpdateEjesPersonaDto } from './dto/update-ejes-persona.dto';

@Controller('ejes-personas')
export class EjesPersonasController {
  constructor(private readonly ejesPersonasService: EjesPersonasService) {}

  @Post()
  create(@Body() createEjesPersonaDto: CreateEjesPersonaDto) {
    return this.ejesPersonasService.create(createEjesPersonaDto);
  }

  @Get()
  findAll() {
    return this.ejesPersonasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ejesPersonasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEjesPersonaDto: UpdateEjesPersonaDto) {
    return this.ejesPersonasService.update(+id, updateEjesPersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ejesPersonasService.remove(+id);
  }
}
