import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountResponse } from '../bean/page';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:9001/chariot-inspector/account';

  constructor(private http: HttpClient) { }

  getAccountById(userId: number): Observable<any> {
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`${this.baseUrl}/get-account-by-id/${userId}`, { headers });
  }

  getUserIdByEmail(email: string): Observable<any> {
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`${this.baseUrl}/get-user-id-by-email?email=${email}`, { headers });
  }

  addAccount(accountData: any): Observable<any> {
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<any>(`${this.baseUrl}/add-new-account`, accountData, { headers });
  }

  getAllUsers(page: number = 0, size: number = 10): Observable<any> {
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`${this.baseUrl}/all-account?page=${page}&size=${size}`, { headers });
  }

  allAccount(page: number = 0, size: number = 10): Observable<AccountResponse> {
    const token = this.getToken();

    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<AccountResponse>(`${this.baseUrl}/all?page=${page}&size=${size}`, { headers });
  }

  private getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}
