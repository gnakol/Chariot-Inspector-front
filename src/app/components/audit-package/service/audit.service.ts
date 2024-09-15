import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Audit, AuditResponse } from '../bean/audit';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private baseUrlAudit = 'http://localhost:9001/chariot-inspector/audit';

  constructor(private http : HttpClient) { }

  allAudit() : Observable<AuditResponse>
  {
    const headers = this.getHeaders();

    return this.http.get<AuditResponse>(`${this.baseUrlAudit}/all-audit`, {headers});
  }

  addNewAudit(audit : Audit) : Observable<Audit>
  {
    const headers = this.getHeaders();

    return this.http.post<Audit>(`${this.baseUrlAudit}/add-new-audit`, audit, {headers});
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
