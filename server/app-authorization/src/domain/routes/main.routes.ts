import { Routes, RouteTree } from '@nestjs/core';
import { routes as authorization } from '../routes/authorization.routes';
import { OrganizacionesModule } from '../entities/organizaciones/organizaciones.module';
import { PersonasModule } from '../entities/personas/personas.module';

const organizationRoutes: RouteTree = {
  path: 'organizations',
  module: OrganizacionesModule,
};

const usersRoutes: RouteTree = {
  path: 'users',
  module: PersonasModule,
};

export const routes: Routes = [
  {
    path: 'api',
    children: [authorization, organizationRoutes, usersRoutes],
  },
];
