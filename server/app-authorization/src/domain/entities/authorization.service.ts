import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CognitoProfileDto } from '../shared/global-dto/cognito-profile.dto';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenDto,
  PayloadDto,
  ResponseAccessTokenDto,
  ValidJwtResponse,
} from '../shared/global-dto/payload.dto';
import { TokensRenovacion } from './tokens-renovacion/entities/refresh-token.entity';
import { TokensRenovacionService } from './tokens-renovacion/tokens-renovacion.service';
import { ENV } from '../shared/utils/env.utils';
import { env } from 'process';
import { isEmpty } from '../shared/utils/object.utils';
import { PersonasService } from './personas/personas.service';
import { Persona } from './personas/entities/persona.entity';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly _jwt: JwtService,
    private readonly _tokensRenovacionService: TokensRenovacionService,
    private readonly _personasService: PersonasService,
  ) {}

  login(profileData: CognitoProfileDto): Promise<ResponseAccessTokenDto> {
    const email: string = profileData.email?.trim().toLocaleLowerCase();
    //const isCgir: boolean = email.includes('@cgiar.org');
    const access: Promise<AccessTokenDto> = this._personasService
      .findUserLogin(email)
      .then(async (user: Persona) => {
        const tempUser: Persona = user;

        if (tempUser) {
          const accessToken: string = this.generateToken(tempUser);
          const tokenObj: AccessTokenDto = new AccessTokenDto(
            accessToken,
            tempUser,
          );
          return {
            ...tokenObj,
            user: tempUser,
          };
        }

        throw new UnauthorizedException(
          `El usuario ${email} no está autorizado para acceder a la aplicación. Por favor, contacte al equipo de soporte.`,
        );
      });

    return access.then((access: AccessTokenDto) => {
      const { id: user_id } = access.user;
      return this.dataSource
        .getRepository(TokensRenovacion)
        .save({
          creado_por: user_id,
          persona_id: user_id,
          codigo: access.refresh_token,
          fecha_expiracion: ENV.EXPIRE_DATE,
        })
        .then((refreshToken: TokensRenovacion) => {
          return {
            ...new ResponseAccessTokenDto(
              access.access_token,
              refreshToken.codigo,
            ),
            user: access.user,
          };
        });
    });
  }

  private generateToken(user: Persona): string {
    const payload: PayloadDto = {
      id: user.id,
      first_name: user.nombre,
      last_name: user.apellido,
    };
    return this._jwt.sign(payload);
  }

  async refreshToken(refreshToken: string): Promise<ResponseAccessTokenDto> {
    const token: Promise<TokensRenovacion> =
      this._tokensRenovacionService.validActiveRefreshToken(refreshToken);
    return token.then(({ persona }: TokensRenovacion) => {
      return new ResponseAccessTokenDto(
        this.generateToken(persona),
        refreshToken,
      );
    });
  }

  async validJwt(token: string): Promise<ValidJwtResponse> {
    const dataResponse: ValidJwtResponse = {
      isValid: false,
    };
    try {
      const decoded: PayloadDto = this._jwt.verify(token, {
        secret: env.ARIM_JWT_SECRET,
      });
      if (decoded?.id) {
        const user = await this._personasService.findById(decoded.id);
        dataResponse.isValid = !isEmpty(user?.id);
        dataResponse.user = user;
      }
      return dataResponse;
    } catch (_error) {
      return dataResponse;
    }
  }
}
