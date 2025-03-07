import { Controller } from '@nestjs/common';
import { PersonasService } from './personas.service';

@Controller()
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}
}
