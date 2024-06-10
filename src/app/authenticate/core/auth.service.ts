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
}
