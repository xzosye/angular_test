// auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredPosition = route.data['position'];
    const userPosition = this.authService.getUserPosition(); // รับค่าสิทธิ์จาก AuthService

    switch (requiredPosition) {
      case 'admin':
        if (userPosition === 'admin') {
          return true;
        }
        break;
      case 'manager':
        if (userPosition === 'manager') {
          return true;
        }
        break;
      case 'user':
        if (userPosition === 'user') {
          return true;
        }
        break;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
