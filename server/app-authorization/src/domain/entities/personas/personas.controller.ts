import { Controller, Get, HttpStatus } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseUtils } from '../../shared/utils/response.utils';

@ApiTags('Personas')
@ApiBearerAuth()
@Controller()
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  @Get('personas')
  async findUsers() {
    return this.personasService.findUsers().then(res => ResponseUtils.format({
      data: res,
      description: 'Personas obtenidas correctamente',
      status: HttpStatus.OK,
    }))
  }

}
