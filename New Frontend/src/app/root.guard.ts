import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakService } from './services/keycloak.service';

export const rootGuard: CanActivateFn = (route, state) => {
  const kc = inject(KeycloakService);
  const router = inject(Router);

  if (kc.isLoggedIn()) {
    router.navigate(['/rooms']);
    return false;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
