import { Routes, RouteTree } from '@nestjs/core';
import { routes as authorization } from '../routes/authorization.routes';
import { OrganizacionesModule } from '../entities/organizaciones/organizaciones.module';

const organizationRoutes: RouteTree = {
  path: 'organizations',
  module: OrganizacionesModule,
};

export const routes: Routes = [
  {
    path: 'api',
    children: [authorization, organizationRoutes],
  },
];
