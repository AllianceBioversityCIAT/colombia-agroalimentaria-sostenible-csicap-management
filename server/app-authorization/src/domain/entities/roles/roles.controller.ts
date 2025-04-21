import { BadRequestException, Controller, Get, HttpStatus, ParseIntPipe, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Retorna id y nombre de roles' })
  @Get('roles_id')
  async findRoles() {
    return this.rolesService.findRoles().then(res => ResponseUtils.format({
      data: res,
      description: 'Roles encontrados correctamente',
      status: HttpStatus.OK,
    }))
  }


  @ApiOperation({ summary: 'Filtra roles dependiendo de la organización seleccionada' })
  @Get('filtro_rol')
  @ApiQuery({
    name: 'orgId',
    required: true,
    description: 'ID Organizacion seleccionada',
    type: Number,
  })
  getRoles(@Query('orgId', ParseIntPipe) orgId: number) {
    if (!orgId) {
      throw new BadRequestException('El parámetro organizacion es obligatorio');
    }
    return this.rolesService.getPorOrganizacion(orgId).then(res =>
      ResponseUtils.format({
        data: res,
        description: 'Roles obtenidos correctamente',
        status: HttpStatus.OK,
      })
    );
  }
}
