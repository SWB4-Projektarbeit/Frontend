import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="logo">
          <span class="logo-icon">▦</span>
          <div class="logo-text">
            <span class="logo-main">ESSLINGEN</span>
            <span class="logo-sub">UNIVERSITY</span>
          </div>
        </div>
        <h1>Timesy</h1>
        <p>Raumverwaltung &amp; Displaysteuerung</p>
        <button class="login-btn" (click)="login()">Anmelden</button>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      background: #0d0d0d;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .login-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 3rem 4rem;
      border: 1px solid #2a2a2a;
      background: #1a1a1a;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    .logo-icon {
      font-size: 2rem;
      color: #fff;
    }
    .logo-text {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }
    .logo-main {
      font-size: 1.1rem;
      font-weight: 700;
      color: #fff;
      letter-spacing: 0.05em;
    }
    .logo-sub {
      font-size: 0.75rem;
      color: #888;
      letter-spacing: 0.1em;
    }
    h1 {
      font-size: 2rem;
      font-weight: 300;
      color: #fff;
      margin: 0;
    }
    p {
      color: #888;
      margin: 0;
      font-size: 0.9rem;
    }
    .login-btn {
      margin-top: 1.5rem;
      padding: 0.75rem 2.5rem;
      background: #fff;
      color: #000;
      border: none;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: 0.05em;
      transition: background 0.2s;
    }
    .login-btn:hover {
      background: #e0e0e0;
    }
  `]
})
export class LoginComponent implements OnInit {
  constructor(private keycloak: KeycloakService, private router: Router) {}

  async ngOnInit() {
    if (await this.keycloak.isLoggedIn()) {
      this.router.navigate(['/rooms']);
    }
  }

  login() {
    this.keycloak.login({ redirectUri: window.location.origin + '/rooms' });
  }
}
