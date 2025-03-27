import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { OrganizacionesService } from './organizaciones.service';
import { CreateOrganizacioneDto } from './dto/create-organizacione.dto';
import { UpdateOrganizacioneDto } from './dto/update-organizacione.dto';
import { Organizacione } from './entities/organizacione.entity';
import { ResponseUtils } from 'src/domain/shared/utils/response.utils';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Organizaciones')
@Controller('organizaciones')
export class OrganizacionesController {
  constructor(private readonly organizacionesService: OrganizacionesService) {}

  @Get('nombres')
  async obtenerNombres() {
    return this.organizacionesService.obtenerNombres().then(res => ResponseUtils.format({
      data: res,
      description: 'Nombres de organizaciones obtenidos correctamente',
      status: HttpStatus.OK,
    }))
  }

  @Get('detalle')
  async obtenerDetalles() {
    return this.organizacionesService.obtenerDetalles().then(res =>
      ResponseUtils.format({
        data: res,
        description: 'Detalles de organizaciones con contactos obtenidos correctamente',
        status: HttpStatus.OK,
      })
    );
  }
/* 
  @Post()
  create(@Body() createOrganizacioneDto: CreateOrganizacioneDto) {
    return this.organizacionesService.create(createOrganizacioneDto);
  } 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizacioneDto: UpdateOrganizacioneDto) {
    return this.organizacionesService.update(+id, updateOrganizacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizacionesService.remove(+id);
  } */
}
