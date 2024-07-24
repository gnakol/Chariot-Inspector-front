import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionCarriedOutDTO, ActionCarriedOutResponse } from '../bean/action-carried-out';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionCarriedOutService {

  private baseUrl = 'http://localhost:9001/chariot-inspector/action-carried-out';

  constructor(private http: HttpClient) { }

  addNewActionCarriedOut(actionCarriedOut: ActionCarriedOutDTO): Observable<ActionCarriedOutDTO> {
    const headers = this.getHeaders();
    return this.http.post<ActionCarriedOutDTO>(`${this.baseUrl}/add-new-action-carried-out`, actionCarriedOut, { headers });
  }

  getActionCarriedOutById(idActionCarriedOut: number): Observable<ActionCarriedOutDTO> {
    const headers = this.getHeaders();
    return this.http.get<ActionCarriedOutDTO>(`${this.baseUrl}/get-action-carried-out-by-id/${idActionCarriedOut}`, { headers });
  }

  getAllActionsCarriedOut(page: number, size: number): Observable<ActionCarriedOutResponse> {
    const headers = this.getHeaders();
    return this.http.get<ActionCarriedOutResponse>(`${this.baseUrl}/all-action-carried-out?page=${page}&size=${size}`, { headers });
  }

  updateActionCarriedOut(idActionCarriedOut: number, actionCarriedOut: ActionCarriedOutDTO): Observable<ActionCarriedOutDTO> {
    const headers = this.getHeaders();
    return this.http.put<ActionCarriedOutDTO>(`${this.baseUrl}/update-action-carried-out/${idActionCarriedOut}`, actionCarriedOut, { headers });
  }

  deleteActionCarriedOut(idActionCarriedOut: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/remove-action-carried-out/${idActionCarriedOut}`, { headers, observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        if (response.status === 202) {
          return 'Accepted';
        } else {
          throw new Error('Unexpected response status: ' + response.status);
        }
      })
    );
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
