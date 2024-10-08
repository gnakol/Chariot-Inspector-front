import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BatteryUsage, BatteryUsageResponse } from '../bean/battery-usage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatteryUsageService {

  baseUrl = "http://localhost:9001/chariot-inspector/battery-usage";

  constructor(private http : HttpClient) { }

  addNewBatteryUsage(batteryUsage: BatteryUsage): Observable<BatteryUsage> {

    const headers = this.getHeaders();

    return this.http.post<BatteryUsage>(`${this.baseUrl}/add-new-battery-usage`, batteryUsage, { headers });
  }

  getBatteryUsageById(idBatteryUsage: number): Observable<BatteryUsage> {
    
    const headers = this.getHeaders();

    return this.http.get<BatteryUsage>(`${this.baseUrl}/get-battery-usage-by-id/${idBatteryUsage}`, { headers });
  }

  getBatteryUsageByCartId(cartId : number) : Observable<BatteryUsage>
  {
    const headers = this.getHeaders();

    return this.http.get<BatteryUsage>(`${this.baseUrl}/get-battery-usage-by-cart-id/${cartId}`, {headers});
  }

  getAllBatteryUsage() : Observable<BatteryUsageResponse>
  {
    const headers = this.getHeaders();

    return this.http.get<BatteryUsageResponse>(`${this.baseUrl}/all-battery-usage`, {headers});
  }

  removeBatteryUsage(idBatteryUsage : number) : Observable<any>
  {
    const headers = this.getHeaders();

    return this.http.delete<any>(`${this.baseUrl}/remove-battery-usage-by-id/${idBatteryUsage}`, { headers, responseType: 'text' as 'json' });
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
