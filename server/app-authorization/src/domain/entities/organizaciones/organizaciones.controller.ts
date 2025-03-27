import { Controller, Get, HttpStatus } from '@nestjs/common';
import { OrganizacionesService } from './organizaciones.service';
import { ResponseUtils } from 'src/domain/shared/utils/response.utils';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Organizaciones')
@ApiBearerAuth()
@Controller()
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

}
