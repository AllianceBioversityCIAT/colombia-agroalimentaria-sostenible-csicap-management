import { Routes } from '@nestjs/core';
import { routes as authorization } from '../routes/authorization.routes';

export const routes: Routes = [
  {
    path: 'api',
    children: [authorization],
  },
];
