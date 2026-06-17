import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'rooms', pathMatch: 'full' },
  {
    path: 'rooms',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/room-selection/room-selection.component').then(m => m.RoomSelectionComponent),
  },
  {
    path: 'rooms/:roomUid',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/template-selection/template-selection.component').then(m => m.TemplateSelectionComponent),
  },
  { path: '**', redirectTo: 'rooms' },
];
