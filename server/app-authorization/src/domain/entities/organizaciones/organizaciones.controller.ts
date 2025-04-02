import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { OrganizacionesService } from './organizaciones.service';
import { ResponseUtils } from 'src/domain/shared/utils/response.utils';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Organizaciones')
@ApiBearerAuth()
@Controller()
export class OrganizacionesController {
  constructor(private readonly organizacionesService: OrganizacionesService) {}

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

  @Get('nombres')
  @ApiQuery({ name: 'searchTerm', type: String, required: false, description: 'Nombre de la organización a buscar' })
  async obtenerNombres(@Query('searchTerm') searchTerm: string) {
    return this.organizacionesService.obtenerNombres(searchTerm).then(res =>
      ResponseUtils.format({
        data: res,
        description: 'Organizaciones y logos obtenidos correctamente',
        status: HttpStatus.OK,
      })
    );
  }

  @Get('id')
  async obtenerId(){
    return this.organizacionesService.obtenerId().then(res =>
      ResponseUtils.format({
        data: res,
        description: 'Id de organizaciones obtenidos correctamente',
        status: HttpStatus.OK,
      })
    );

  }

}
