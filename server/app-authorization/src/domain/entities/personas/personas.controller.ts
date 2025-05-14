import { Body, Controller, Get, HttpStatus, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchRequest } from '../../shared/decorators/search-request.decorator';

@ApiTags('Personas')
@ApiBearerAuth()
@Controller()
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  @ApiOperation({ summary: 'Retorna lista de usuarios con filtros opcionales' })
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

  @ApiOperation({ summary: 'Creación de usuarios CGIAR y no CGIAR' })
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.personasService.create(createUserDto).then(res => ResponseUtils.format({
      data: res,
      description: 'El usuario ha sido creado exitosamente en el sistema',
      status: HttpStatus.OK,
    }))
  }

  @Get('current-user')
  async getCurrentUser() {
    return this.personasService.findCurrentUser().then(res =>
      ResponseUtils.format({
            description: `Información de usuario obtenida correctamente`,
            data: res,
            status: HttpStatus.OK,
          })
    );
  }

}
