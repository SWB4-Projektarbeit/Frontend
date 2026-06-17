import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private kc: Keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'swt-projekt',
    clientId: 'frontend',
  });

  async init(): Promise<void> {
    await this.kc.init({ checkLoginIframe: false });
  }

  isAuthenticated(): boolean {
    return !!this.kc.authenticated;
  }

  login(redirectUri?: string): Promise<void> {
    return this.kc.login({ redirectUri });
  }

  getToken(): string | undefined {
    return this.kc.token;
  }

  async getValidToken(): Promise<string | undefined> {
    try {
      await this.kc.updateToken(30);
    } catch {
      await this.kc.login();
    }
    return this.kc.token;
  }

  logout(): Promise<void> {
    return this.kc.logout({ redirectUri: window.location.origin });
  }
}
