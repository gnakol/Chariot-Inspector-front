import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntermediateService {

  private readonly apiUrl = 'http://localhost:9001/chariot-inspector';

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  post(endpoint: string, body: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}${endpoint}`, body, { headers });
  }

  get(endpoint: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}${endpoint}`, { headers });
  }
}
