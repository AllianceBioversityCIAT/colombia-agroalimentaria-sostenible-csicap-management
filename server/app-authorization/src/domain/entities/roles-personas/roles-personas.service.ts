import { Injectable } from '@nestjs/common';
import { BaseServiceSimple } from '../../shared/global-dto/base-service';
import { RolesPersona } from './entities/roles-persona.entity';
import { DataSource, Repository } from 'typeorm';
import { CurrentUserUtil } from '../../shared/utils/current-user.util';

@Injectable()
export class RolesPersonasService extends BaseServiceSimple<
  RolesPersona,
  Repository<RolesPersona>
> {
  constructor(dataSource: DataSource, currentUserUtil: CurrentUserUtil) {
    super(
      RolesPersona,
      dataSource.getRepository(RolesPersona),
      'persona_id',
      currentUserUtil,
    );
  }
}
