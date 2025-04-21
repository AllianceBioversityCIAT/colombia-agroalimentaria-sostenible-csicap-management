import { Body, Controller, Get, HttpStatus, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Personas')
@ApiBearerAuth()
@Controller()
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

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

  @Post('create')
  //@UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    return this.personasService.create(createUserDto).then(res => ResponseUtils.format({
      data: res,
      description: 'El usuario ha sido creado exitosamente en el sistema',
      status: HttpStatus.OK,
    }))
  }

}
