import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaurusUsage } from '../bean/taurusUsage';
import { Observable } from 'rxjs';
import { AuthService } from '../../../authenticate/core/auth.service';
import { Taurus } from '../bean/taurus';
import { TaurusUsageResponse } from '../bean/page';

@Injectable({
  providedIn: 'root'
})
export class TaurusService {

  private baseUrl = 'http://localhost:9001/chariot-inspector/taurus-usage';

  private baseUrlTaurus = 'http://localhost:9001/chariot-inspector/taurus';



  constructor(private http : HttpClient, private authService : AuthService) { }

  saveTaurusUsage(taurusUsage: TaurusUsage): Observable<TaurusUsage> {

    const token = this.authService.getToken();

    const workSessionId = localStorage.getItem('workSessionId');
    if(workSessionId)
    {
      taurusUsage.workSessionId = workSessionId;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<TaurusUsage>(`${this.baseUrl}/add-new-taurus-usage`, taurusUsage);
  }

  getAccountById(userId: string): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`${this.baseUrl}/get-account-by-id/${userId}`, { headers });
  }

  getTaurusById(taurusId: number): Observable<Taurus> {
    const token = this.authService.getToken();

    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Taurus>(`${this.baseUrlTaurus}/get-taurus-by-id/${taurusId}`, { headers });
  }

  getIdTaurusByNum(taurusNumber: number): Observable<number> {
    const token = localStorage.getItem('jwtToken');

    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<number>(`${this.baseUrlTaurus}/get-id-taurus-by-number/${taurusNumber}`, { headers });
  }

  public addNewTaurusUsage(taurusUsage : TaurusUsage) : Observable<TaurusUsage>
  {
    const token = this.authService.getToken();

    const workSessionId = localStorage.getItem("workSessionId");

    if(workSessionId)
    {
      taurusUsage.workSessionId = workSessionId;
    }

    if(!token)
      {
        throw new Error('No token found');
      }

      const headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      });

      return this.http.post<TaurusUsage>(`${this.baseUrl}/add-new-taurus-usage`, taurusUsage, {headers});
  }

  getTaurusUsageByTaurusId(taurusId: number): Observable<TaurusUsage> {
    const token = this.authService.getToken();

    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<TaurusUsage>(`${this.baseUrl}/get-taurus-usage-by-taurus-id/${taurusId}`, { headers });
  }

  takeTaurusUsageByWorkSessionId(workSessionId : string) : Observable<TaurusUsage>
  {
    const headers = this.getHeaders();

    return this.http.get<TaurusUsage>(`${this.baseUrl}/take-taurus-usage-by-work-session-id?workSessionId=${workSessionId}`, {headers});
  }

  getAllTaurusUsages(): Observable<TaurusUsageResponse> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<TaurusUsageResponse>(`${this.baseUrl}/all-taurus-usage`, { headers });
  }

  getAllUsages(): Observable<TaurusUsageResponse> {
    const headers = this.getHeaders();
    return this.http.get<TaurusUsageResponse>(`${this.baseUrl}/all-taurus-usage`, { headers });
  }

  removeTaurusUsage(idTaurusUsage: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.baseUrl}/remove-taurus-usage-by-id/${idTaurusUsage}`, { headers, responseType: 'text' as 'json' });
  }

  searchTaurusUsages(query: string, page: number, size: number): Observable<TaurusUsageResponse> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = {
      query: query,
      page: page.toString(),
      size: size.toString(),
    };
  
    return this.http.get<TaurusUsageResponse>(`${this.baseUrl}/all-taurus-usage-by-filter`, { headers, params });
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
