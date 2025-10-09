// src/app/auth/auth-state.service.ts
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private isLoginPage = false;

  constructor(private router: Router) {
    // Écoute les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // ✅ Vérifie si l'URL COMMENCE par '/login' (tolérant au slash final)
      this.isLoginPage = event.urlAfterRedirects.startsWith('/login');
      console.log('Navigation vers:', event.urlAfterRedirects, '| isLoginPage:', this.isLoginPage);
    });
  }

  getIsLoginPage(): boolean {
    return this.isLoginPage;
  }
}