import { v4 as uuidv4 } from 'uuid';
import { RolesPersona } from '../../entities/roles-personas/entities/roles-persona.entity';
import { Persona } from '../../entities/personas/entities/persona.entity';

export class PayloadDto {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public roles?: RolesPersona[],
  ) {}
}

export class AccessTokenDto {
  public refresh_token: string;
  constructor(
    public access_token: string,
    public user: Persona,
  ) {
    this.refresh_token = uuidv4();
  }
}

export class ResponseAccessTokenDto {
  public user: Partial<Persona>;
  constructor(
    public access_token: string,
    public refresh_token: string,
  ) {}
}

export class ValidJwtResponse {
  public isValid: boolean;
  public user?: Partial<Persona>;
}
