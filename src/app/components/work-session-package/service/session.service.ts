import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkSessionService {

  private readonly endSessionUrl = 'http://localhost:9001/chariot-inspector/work-session/end-session';

  constructor(private http: HttpClient) { }

  endWorkSession(workSessionId: string): Observable<void> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { workSessionId };
    return this.http.post<void>(this.endSessionUrl, body, { headers });
  }
}
