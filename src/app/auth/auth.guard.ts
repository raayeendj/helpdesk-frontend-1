import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Add your authentication logic here
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Add your admin authentication logic here
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class AgentGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Add your agent authentication logic here
    return true;
  }
}