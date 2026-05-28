import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
<<<<<<< HEAD
import { KeycloakService } from './services/keycloak.service';

export const authGuard: CanMatchFn = () => {
  const kc = inject(KeycloakService);
  // For now, just check if logged in; role checking will be implemented when Keycloak is fully integrated
  if (kc.isLoggedIn()) {
    return true;
  }
  kc.login();
  return false;
=======
import { map, catchError, of } from 'rxjs';
import { AuthService } from './services/auth.service';

export const authGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  return auth.me().pipe(
    map(() => true),
    catchError(() => {
      auth.login();
      return of(false);
    })
  );
>>>>>>> 7e1f99e (Add Keycloak and New Frontend with BFF authentication implementation)
};

export const roleGuard = (roles: string[]): CanMatchFn => {
  return () => {
<<<<<<< HEAD
    const kc = inject(KeycloakService);
    if (kc.hasAnyRole(roles)) {
      return true;
    }
    kc.login();
    return false;
=======
    const auth = inject(AuthService);
    return auth.me().pipe(
      map((me) => roles.some((role) => me.roles.includes(role))),
      catchError(() => {
        auth.login();
        return of(false);
      })
    );
>>>>>>> 7e1f99e (Add Keycloak and New Frontend with BFF authentication implementation)
  };
};

