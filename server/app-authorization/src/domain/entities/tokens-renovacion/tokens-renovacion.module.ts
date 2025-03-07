import { Module } from '@nestjs/common';
import { TokensRenovacionService } from './tokens-renovacion.service';

@Module({
  providers: [TokensRenovacionService],
  exports: [TokensRenovacionService],
})
export class TokensRenovacionModule {}
