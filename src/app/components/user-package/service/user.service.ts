import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:9001/chariot-inspector/account';

  constructor(private http: HttpClient) { }

  getAccountById(userId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`${this.baseUrl}/get-account-by-id/${userId}`, { headers });
  }

  getUserIdByEmail(email: string): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`${this.baseUrl}/get-user-id-by-email?email=${email}`, { headers });
  }

  addAccount(accountData: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<any>(`${this.baseUrl}/add-new-account`, accountData, { headers });
  }

}
