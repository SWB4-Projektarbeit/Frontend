import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

export const authGuard: CanActivateFn = async (_route, state) => {
  const keycloak = inject(KeycloakService);
  const router = inject(Router);

  const isLoggedIn = await keycloak.isLoggedIn();
  if (isLoggedIn) return true;

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
