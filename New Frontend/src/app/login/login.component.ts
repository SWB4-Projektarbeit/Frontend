import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KeycloakService } from '../services/keycloak.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private kc: KeycloakService, private router: Router) {}

  ngOnInit() {
    // If already logged in via Keycloak, redirect to rooms
    if (this.kc.isLoggedIn()) {
      this.router.navigate(['/rooms']);
    }
  }

  login() {
    this.kc.login();
  }
}
