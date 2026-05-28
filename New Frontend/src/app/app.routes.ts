import { Routes } from '@angular/router';

import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'rooms', pathMatch: 'full' },
  { path: 'rooms', loadComponent: () => import('./rooms/rooms.component').then(m => m.RoomsComponent), canMatch: [authGuard] }
];
