import { Controller} from '@nestjs/common';
import { EjesPersonasService } from './ejes-personas.service';

@Controller()
export class EjesPersonasController {
  constructor(private readonly ejesPersonasService: EjesPersonasService) {}
}
