import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamoDBModule } from './db/config/dynamo/dynamo.module';
import { getDataSource } from './db/config/mysql/orm.config';
import { env } from 'process';
import { ConfigModule } from '@nestjs/config';
import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
  RouterModule,
} from '@nestjs/core';
import { GlobalExceptions } from './domain/shared/error-management/global.exception';
import { LoggingInterceptor } from './domain/shared/Interceptors/logging.interceptor';
import { ResponseInterceptor } from './domain/shared/Interceptors/response.interceptor';
import { routes as mainRoutes } from './domain/routes/main.routes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationModule } from './domain/entities/authorization.module';
import { JwtMiddleware } from './domain/shared/middlewares/jwr.middleware';
import { dataSourceTarget } from './db/config/mysql/enum/data-source-target.enum';
import { DataSourceOptions } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PermissionGuard } from './domain/shared/guards/permission.guard';
import { GlobalUtilsModule } from './domain/shared/utils/global-utils.module';

@Module({
  imports: [
    JwtModule,
    GlobalUtilsModule,
    DynamoDBModule.forRoot({
      region: env.ARIM_DYNAMO_REGION,
      credentials: {
        accessKeyId: env.ARIM_DYNAMO_ACCESS_KEY,
        secretAccessKey: env.ARIM_DYNAMO_SECRET_ACCESS_KEY,
      },
    }),
    TypeOrmModule.forRoot(
      <DataSourceOptions>getDataSource(dataSourceTarget.CORE, false),
    ),
    RouterModule.register(mainRoutes),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptions,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(
      {
        path: 'api/organizations/*',
        method: RequestMethod.ALL,
      },
      {
        path: 'api/users/*',
        method: RequestMethod.ALL,
      },
      {
        path: 'api/roles/*',
        method: RequestMethod.ALL,
      }
    );
  }
}
