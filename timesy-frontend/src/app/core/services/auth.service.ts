import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly backendUrl = 'http://localhost:8215';

  login() {
    const redirectUri = encodeURIComponent(window.location.href);
    window.location.href = `${this.backendUrl}/api-timesy/login?redirect_uri=${redirectUri}`;
  }

  logout() {
    window.location.href = `${this.backendUrl}/api-timesy/logout`;
  }
}
