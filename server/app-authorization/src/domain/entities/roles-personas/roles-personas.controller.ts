import { Controller } from '@nestjs/common';
import { RolesPersonasService } from './roles-personas.service';

@Controller()
export class RolesPersonasController {
  constructor(private readonly rolesPersonasService: RolesPersonasService) {}
}
