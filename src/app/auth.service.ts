import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}
  private isAuth = false;

  login() {
    this.isAuth = true;
    this.router.navigate(['/Dashboard']);
    localStorage.setItem('auth', 'true');
  }

  logout() {
    this.isAuth = false;
    this.router.navigate(['/Login']);
    localStorage.setItem('auth', 'false');
  }

  isAuthenticated(): Promise<boolean> {
    this.isAuth = localStorage.getItem('auth') === 'true';
    return new Promise((resolve) => resolve(this.isAuth));
  }
}
