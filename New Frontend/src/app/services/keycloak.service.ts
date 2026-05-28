import { Injectable } from '@angular/core';
<<<<<<< HEAD
import Keycloak, { KeycloakInstance } from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloak?: KeycloakInstance;

  init(): Promise<void> {
    this.keycloak = new (Keycloak as any)({
      url: 'http://localhost:8080/',
      realm: 'studienprojekt',
      clientId: 'frontend'
    });

    return this.keycloak!.init({ 
      onLoad: 'check-sso',
      checkLoginIframe: false
    })
      .then(() => { 
        console.log('Keycloak init successful, token:', !!this.keycloak?.token);
        return; 
      })
      .catch((err) => { console.error('Keycloak init failed', err); return Promise.resolve(); });
  }

  login(): void {
    this.keycloak?.login();
  }

  logout(): void {
    this.keycloak?.logout();
  }

  isLoggedIn(): boolean {
    return !!(this.keycloak && this.keycloak.token && this.keycloak.tokenParsed?.exp && this.keycloak.tokenParsed.exp > (Date.now() / 1000));
  }

  getToken(): string | undefined {
    return this.keycloak?.token;
  }

  hasAnyRole(roles: string[]): boolean {
    if (!this.keycloak?.tokenParsed) return false;
    const userRoles = (this.keycloak.tokenParsed as any)?.realm_access?.roles || [];
    return roles.some(role => userRoles.includes(role));
=======

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
>>>>>>> 7e1f99e (Add Keycloak and New Frontend with BFF authentication implementation)
  }
}
