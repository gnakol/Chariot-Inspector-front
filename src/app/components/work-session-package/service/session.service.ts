import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkSession, WorkSessionResponse } from '../bean/session';

@Injectable({
  providedIn: 'root'
})
export class WorkSessionService {

  private baseUrl = 'http://localhost:9001/chariot-inspector/work-session';

  private readonly endSessionUrl = 'http://localhost:9001/chariot-inspector/work-session/end-session';

  constructor(private http: HttpClient) { }

  // endWorkSession(workSessionId: string): Observable<void> {
  //   const token = localStorage.getItem('jwtToken');
  //   if (!token) {
  //     throw new Error('No token found');
  //   }

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });

  //   const body = { workSessionId };
  //   return this.http.post<void>(this.endSessionUrl, body, { headers });
  // }

  getAllWorkSessions(): Observable<WorkSessionResponse> {
    const headers = this.getHeaders();
    return this.http.get<WorkSessionResponse>(`${this.baseUrl}/all-work-session`, { headers });
  }

  getWorkSessionById(idWorkSession: number): Observable<WorkSession> {
    const headers = this.getHeaders();
    return this.http.get<WorkSession>(`${this.baseUrl}/get-work-session-by-id/${idWorkSession}`, { headers });
  }

  endWorkSession(workSessionId: string): Observable<void> {
    const headers = this.getHeaders();
    const body = { workSessionId };
    return this.http.post<void>(`${this.baseUrl}/end-session`, body, { headers });
  }

  removeWorkSession(idWorkSession: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.baseUrl}/remove-work-session/${idWorkSession}`, { headers, responseType : 'text' as 'json' });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('No token found');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  
}
