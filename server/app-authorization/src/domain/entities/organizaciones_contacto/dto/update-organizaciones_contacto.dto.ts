import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizacionesContactoDto } from './create-organizaciones_contacto.dto';

export class UpdateOrganizacionesContactoDto extends PartialType(CreateOrganizacionesContactoDto) {}
