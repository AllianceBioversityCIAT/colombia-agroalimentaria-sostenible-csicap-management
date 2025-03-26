import { PartialType } from '@nestjs/mapped-types';
import { CreateEjesPersonaDto } from './create-ejes-persona.dto';

export class UpdateEjesPersonaDto extends PartialType(CreateEjesPersonaDto) {}
