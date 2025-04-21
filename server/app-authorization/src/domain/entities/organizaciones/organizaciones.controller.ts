import { BadRequestException, Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { OrganizacionesService } from './organizaciones.service';
import { ResponseUtils } from 'src/domain/shared/utils/response.utils';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Organizaciones')
@ApiBearerAuth()
@Controller()
export class OrganizacionesController {
  constructor(private readonly organizacionesService: OrganizacionesService) {}

  @ApiOperation({ summary: 'Retorna detalle de todas las organizaciones' })
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

  @ApiOperation({ summary: 'Retorna nombre corto y logo de organizaciones con base en la búsqueda del usuario' })
  @Get('nombres')
  @ApiQuery({
    name: 'searchTerm',
    type: String,
    required: false,
    description: 'Nombre de la organización a buscar'
  })
  async obtenerNombres(@Query('searchTerm') searchTerm: string) {
    return this.organizacionesService.obtenerNombres(searchTerm).then(res =>
      ResponseUtils.format({
        data: res,
        description: 'Organizaciones y logos obtenidos correctamente',
        status: HttpStatus.OK,
      })
    );
  }

  @ApiOperation({ summary: 'Retorna solo id y nombre corto de organizaciones' })
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

  @ApiOperation({ summary: 'Filtra organizaciones dependiendo si el usuario a crear es CGIAR o no' })
  @Get('filtro_org')
  @ApiQuery({
    name: 'isCgiar',
    required: true,
    description: 'Usuario CGIAR o no CGIAR',
    type: Boolean,
  })
  getOrganizaciones(@Query('isCgiar') isCgiar: string) {
    if (isCgiar === undefined || isCgiar === null) {
      throw new BadRequestException('El parámetro isCgiar es obligatorio');
    }
    const isCGIAR = String(isCgiar).toLowerCase() === 'true';
    return this.organizacionesService.getFiltradas(isCGIAR).then(res =>
      ResponseUtils.format({
        data: res,
        description: 'Organizaciones obtenidas correctamente',
        status: HttpStatus.OK,
      })
    );
  }

}
