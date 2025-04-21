import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { EjesPersona } from './entities/ejes-persona.entity';
import { CurrentUserUtil } from '../../shared/utils/current-user.util';
import { BaseServiceSimple } from '../../shared/global-dto/base-service';

@Injectable()
export class EjesPersonasService extends BaseServiceSimple<
  EjesPersona,
  Repository<EjesPersona>
>{
  constructor(dataSource: DataSource, currentUserUtil: CurrentUserUtil) {
    super(
      EjesPersona,
      dataSource.getRepository(EjesPersona),
      'persona_id',
      currentUserUtil,
    );
  }
}

