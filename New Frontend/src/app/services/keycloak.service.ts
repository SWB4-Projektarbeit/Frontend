import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  init(): Promise<void> {
    return Promise.resolve();
  }

  login(): void {
    window.location.href = 'http://localhost:8081/auth/login';
  }

  logout(): void {
    window.location.href = 'http://localhost:4200';
  }

  isLoggedIn(): boolean {
    return false;
  }

  getToken(): string | undefined {
    return undefined;
  }

  hasAnyRole(roles: string[]): boolean {
    return false;
  }
}
