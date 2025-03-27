import { Injectable, Logger } from '@nestjs/common';
import {
  CognitoConfigDto,
  ResponseCognitoDto,
} from '../../../shared/global-dto/cognito-config.dto';
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';

export class AWSutil {
  public static readonly cognito = {
    config: (config: CognitoConfigDto): ResponseCognitoDto => {
      return {
        body: new URLSearchParams({
          ...config.moreoptions?.body,
          grant_type: config?.grant_type || 'authorization_code',
          client_id: config.client_id,
          client_secret: config.client_secret,
          code: config.code,
          redirect_uri: config.redirect_uri,
        })?.toString(),
        headers: {
          auth: {
            username: config.client_id,
            password: config.client_secret,
          },
          headers: {
            ...config.moreoptions?.headers,
            'Content-Type':
              config.moreoptions?.headers?.['Content-Type'] ||
              'application/x-www-form-urlencoded',
          },
        },
      };
    },
  };
}

@Injectable()
export class AWSUtilsService {
  private cognitoClient: CognitoIdentityProviderClient;

  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: process.env.ARIM_COGNITO_REGION,
      credentials: {
        accessKeyId: process.env.ARIM_COGNITO_CLIENT_ID,
        secretAccessKey: process.env.ARIM_COGNITO_CLIENT_SECRET,
      },
    });
  }

  async createNewUser(user: AWSNewUser, customPassword?: boolean) {
    const createUserCommand = new AdminCreateUserCommand({
      UserPoolId: process.env.ARIM_COGNITO_POOL_ID,
      Username: user.email,
      UserAttributes: [
        { Name: 'email', Value: user.email },
        { Name: 'name', Value: user.firstName },
        { Name: 'family_name', Value: user.lastName },
        { Name: 'email_verified', Value: 'true' },
      ],
    });

    return this.cognitoClient
      .send(createUserCommand)
      .catch((error) => {
        throw error;
      })
      .then(async () => {
        if (customPassword) {
          const tempPassword = Math.random().toString(36).slice(-8);
          const setPasswordCommand = new AdminSetUserPasswordCommand({
            UserPoolId: process.env.ARIM_COGNITO_POOL_ID,
            Username: user.email,
            Password: tempPassword,
            Permanent: true, // True para que el usuario no tenga que cambiar la contraseña al iniciar sesión
          });

          await this.cognitoClient.send(setPasswordCommand).then(() => {
            /**
             * send email with temp password
             * tempPassword - The temporary password
             * user.email - The user's email
             */
          });

          return user;
        }
      });
  }
}

export class AWSNewUser {
  public email: string;
  public firstName: string;
  public lastName: string;
}
