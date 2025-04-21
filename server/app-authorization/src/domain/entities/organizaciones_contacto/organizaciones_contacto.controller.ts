import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizacionesContactoService } from './organizaciones_contacto.service';
import { CreateOrganizacionesContactoDto } from './dto/create-organizaciones_contacto.dto';
import { UpdateOrganizacionesContactoDto } from './dto/update-organizaciones_contacto.dto';

@Controller('organizaciones-contacto')
export class OrganizacionesContactoController {
  constructor(private readonly organizacionesContactoService: OrganizacionesContactoService) {}

}
