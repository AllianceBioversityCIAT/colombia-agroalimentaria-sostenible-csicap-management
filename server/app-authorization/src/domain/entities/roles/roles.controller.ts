import { Controller, Get, HttpStatus } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get('roles_id')
  async findRoles() {
    return this.rolesService.findRoles().then(res => ResponseUtils.format({
      data: res,
      description: 'Filtro aplicado correctamente',
      status: HttpStatus.OK,
    }))
  }
}
