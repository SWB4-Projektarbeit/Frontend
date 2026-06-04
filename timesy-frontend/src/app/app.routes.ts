import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'rooms', pathMatch: 'full' },
  {
    path: 'rooms',
    loadComponent: () => import('./pages/room-selection/room-selection.component').then(m => m.RoomSelectionComponent),
  },
  { path: '**', redirectTo: 'rooms' },
];
