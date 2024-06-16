import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:9001/chariot-inspector/connexion';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<string> {
    const body = { username, password };
    return this.http.post<{ bearer: string }>(this.apiUrl, body)
      .pipe(
        map(response => {
          console.log('API Response:', response); // Log de la réponse complète
          if (response && response.bearer) {
            localStorage.setItem('jwtToken', response.bearer);
            return response.bearer;
          } else {
            throw new Error('Invalid response from server');
          }
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  parseJwt(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      console.log('Parsed JWT Payload:', JSON.parse(jsonPayload)); // Log the payload
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error parsing JWT:', e);
      return null;
    }
  }

  getUserIdFromToken(token: string): string {
    const parsedToken = this.parseJwt(token);
    console.log('Parsed Token:', parsedToken);
    if (parsedToken && parsedToken.sub) {
      return parsedToken.sub;
    } else {
      throw new Error('User ID not found in token');
    }
  }
}
