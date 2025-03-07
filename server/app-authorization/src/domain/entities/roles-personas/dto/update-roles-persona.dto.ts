import { PartialType } from '@nestjs/swagger';
import { CreateRolesPersonaDto } from './create-roles-persona.dto';

export class UpdateRolesPersonaDto extends PartialType(CreateRolesPersonaDto) {}
