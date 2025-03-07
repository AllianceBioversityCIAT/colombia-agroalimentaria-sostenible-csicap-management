import { Routes, RouteTree } from '@nestjs/core';
import { RolesModule } from '../entities/roles/roles.module';
import { AuthorizationModule } from '../entities/authorization.module';
import { PersonasModule } from '../entities/personas/personas.module';
import { RolesPersonasModule } from '../entities/roles-personas/roles-personas.module';

const children: Routes = [
  { path: 'user-roles', module: RolesPersonasModule },
  { path: 'users', module: PersonasModule },
  { path: 'role', module: RolesModule },
];

export const routes: RouteTree = {
  path: 'authorization',
  module: AuthorizationModule,
  children: children,
};
