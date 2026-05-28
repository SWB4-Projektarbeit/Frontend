import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MeResponse {
  authenticated: boolean;
  username: string;
  email: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  me(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.base}/auth/me`, { withCredentials: true });
  }

  login(): void {
    window.location.href = `${this.base}/auth/login`;
  }

  logout(): void {
    window.location.href = `${this.base}/auth/logout`;
  }
}