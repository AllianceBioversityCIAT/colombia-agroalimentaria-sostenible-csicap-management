import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { RolesModule } from './roles/roles.module';
import { HttpModule } from '@nestjs/axios';
import { CognitoStrategy } from '../tools/AWS/cognito/cognito.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TokensRenovacionModule } from './tokens-renovacion/tokens-renovacion.module';
import { MessageMicroservice } from '../tools/broker/message.microservice';
import { PersonasModule } from './personas/personas.module';
import { RolesPersonasModule } from './roles-personas/roles-personas.module';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService, CognitoStrategy, MessageMicroservice],
  imports: [
    RolesModule,
    HttpModule,
    JwtModule.register({
      secret: process.env.ARIM_JWT_SECRET,
      signOptions: { expiresIn: process.env.ARIM_JWT_ACCESS_EXPIRES_IN },
    }),
    TokensRenovacionModule,
    PersonasModule,
    RolesPersonasModule,
  ],
  exports: [],
})
export class AuthorizationModule {}
