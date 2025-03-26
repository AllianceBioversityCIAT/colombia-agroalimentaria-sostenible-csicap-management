import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizacionesContactoService } from './organizaciones_contacto.service';
import { CreateOrganizacionesContactoDto } from './dto/create-organizaciones_contacto.dto';
import { UpdateOrganizacionesContactoDto } from './dto/update-organizaciones_contacto.dto';

@Controller('organizaciones-contacto')
export class OrganizacionesContactoController {
  constructor(private readonly organizacionesContactoService: OrganizacionesContactoService) {}

  @Post()
  create(@Body() createOrganizacionesContactoDto: CreateOrganizacionesContactoDto) {
    return this.organizacionesContactoService.create(createOrganizacionesContactoDto);
  }

  @Get()
  findAll() {
    return this.organizacionesContactoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizacionesContactoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizacionesContactoDto: UpdateOrganizacionesContactoDto) {
    return this.organizacionesContactoService.update(+id, updateOrganizacionesContactoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizacionesContactoService.remove(+id);
  }
}
