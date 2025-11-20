import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
  user: { id: string; name: string; email: string; role: 'Admin' | 'Technician' | 'Agent'; team: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password });
  }

  saveSession(resp: LoginResponse): void {
    localStorage.setItem('token', resp.token);
    localStorage.setItem('role', resp.user.role);
    localStorage.setItem('email', resp.user.email);
    localStorage.setItem('userId', resp.user.id);
    localStorage.setItem('userName', resp.user.name);
    localStorage.setItem('userTeam', resp.user.team);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  isAgent(): boolean {
    return this.getRole() === 'Agent' || this.getRole() === 'Technician';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userTeam');
  }
}


