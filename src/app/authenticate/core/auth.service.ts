import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:9001/chariot-inspector/connexion';
  private readonly workSessionUrl = 'http://localhost:9001/chariot-inspector/work-session/start-session';
  private readonly disconnectUrl = 'http://localhost:9001/chariot-inspector/disconnect';
  private baseUrlValideToken = 'http://localhost:9001/chariot-inspector/token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string): Observable<string> {
    const body = { username, password };
    return this.http.post<{ bearer: string }>(this.apiUrl, body)
      .pipe(
        map(response => {
          console.log('API Response:', response);
          if (response && response.bearer) {
            localStorage.setItem('jwtToken', response.bearer);
            this.router.navigate(['/dashboard']);  // Redirige vers le tableau de bord après la connexion
            return response.bearer;
          } else {
            throw new Error('Invalid response from server');
          }
        })
      );
  }

  logout(): void {
    const token = this.getToken();
    const workSessionId = localStorage.getItem('workSessionId');

    if (!token) {
      console.error('No token found');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post<{ message: string }>(this.disconnectUrl, {}, { headers }).pipe(
      catchError(error => {
        console.error('Error during disconnect:', error);
        return of(null); // Return a default value to complete the observable
      })
    ).subscribe(response => {
      if (response !== null) {
        console.log('Disconnected successfully');
        localStorage.removeItem('jwtToken');
        if (workSessionId) {
          localStorage.removeItem('workSessionId');
        }
        this.router.navigate(['/login']);
      }
    });
  }

  getEmailFromToken(token: string): string {
    const parsedToken = this.parseJwt(token);
    console.log('Parsed Token:', parsedToken);
    if (parsedToken && parsedToken.sub) {
      return parsedToken.sub;
    } else {
      throw new Error('Email not found in token');
    }
  }

  startWorkSession(accountId: number): Observable<string> {
    const token = this.getToken();
    const body = { accountId };
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<{ workSessionId: string }>(this.workSessionUrl, body, { headers })
      .pipe(map(response => {
        console.log('API Work Session Response:', response);
        return response.workSessionId;
      }));
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  parseJwt(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      console.log('Parsed JWT Payload:', JSON.parse(jsonPayload));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error parsing JWT:', e);
      return null;
    }
  }

  getUserIdFromToken(): Observable<number> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token not found');
    }
    const parsedToken = this.parseJwt(token);
    if (parsedToken && parsedToken.sub) {
      const email = parsedToken.sub;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<any>(`http://localhost:9001/chariot-inspector/account/get-user-id-by-email?email=${email}`, { headers })
        .pipe(
          map(response => response.userId)
        );
    } else {
      throw new Error('User ID not found in token');
    }
  }

  validateTokenWithServer(token: string): Observable<{ isValid: boolean }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<{ isValid: boolean }>(`${this.baseUrlValideToken}/validate-token`, { token }, { headers });
  }
}
