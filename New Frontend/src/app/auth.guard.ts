import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
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
};

export const roleGuard = (roles: string[]): CanMatchFn => {
  return () => {
    const auth = inject(AuthService);
    return auth.me().pipe(
      map((me) => roles.some((role) => me.roles.includes(role))),
      catchError(() => {
        auth.login();
        return of(false);
      })
    );
  };
};

