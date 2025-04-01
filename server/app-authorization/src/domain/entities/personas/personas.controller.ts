import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseUtils } from '../../shared/utils/response.utils';

@ApiTags('Personas')
@ApiBearerAuth()
@Controller()
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

/*   @Get('personas')
  async findUsers() {
    return this.personasService.findUsers().then(res => ResponseUtils.format({
      data: res,
      description: 'Personas obtenidas correctamente',
      status: HttpStatus.OK,
    }))
  } */

  @Get('list')
  @ApiQuery({ name: 'organizacion', required: false, type: String, description: 'ID de la organización' })
  @ApiQuery({ name: 'rol', required: false, type: String, description: 'ID del rol' })
  @ApiQuery({ name: 'eje', required: false, type: String, description: 'ID del eje' })
  async filterUsers(@Query() filters: any) {
    console.log('Filtro:', filters);
    return this.personasService.filterUsers(filters).then(res => ResponseUtils.format({
      data: res,
      description: 'Filtro aplicado correctamente',
      status: HttpStatus.OK,
    }))
  }


}
