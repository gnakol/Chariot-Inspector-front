import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// Assurez-vous que le chemin est correct
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    const token = this.authService.getToken();
    if (token) {
      return this.authService.validateTokenWithServer(token).pipe(
        map(response => {
          if (response.isValid) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }),
        catchError(error => {
          this.router.navigate(['/login']);
          return of(false);
        })
      );
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
