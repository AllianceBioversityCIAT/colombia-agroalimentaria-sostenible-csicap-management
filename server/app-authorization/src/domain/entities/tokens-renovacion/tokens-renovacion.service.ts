import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, MoreThanOrEqual } from 'typeorm';
import { TokensRenovacion } from './entities/refresh-token.entity';

@Injectable()
export class TokensRenovacionService {
  constructor(private readonly dataSource: DataSource) {}

  validActiveRefreshToken(refreshToken: string): Promise<TokensRenovacion> {
    const resToken: Promise<TokensRenovacion> = this.dataSource
      .getRepository(TokensRenovacion)
      .findOne({
        where: {
          codigo: refreshToken,
          fecha_expiracion: MoreThanOrEqual(new Date()),
          is_active: true,
        },
        relations: {
          persona: true,
        },
      });

    return resToken.then((token: TokensRenovacion) => {
      if (!token)
        throw new BadRequestException(
          'The refresh token is invalid or expired',
        );

      return token;
    });
  }
}
