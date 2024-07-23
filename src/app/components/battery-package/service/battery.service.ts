import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Battery } from '../bean/battery';
import { AuthService } from '../../../authenticate/core/auth.service';
import { BatteryResponse } from '../bean/page';

@Injectable({
  providedIn: 'root'
})
export class BatteryService {

  private baseUrl = 'http://localhost:9001/chariot-inspector/battery';

  constructor(private http: HttpClient, private authService: AuthService) { }

  public addNewBattery(battery: Battery): Observable<Battery> {
    const token = this.authService.getToken();
  
    if (!token) {
      throw new Error('No token found');
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<Battery>(`${this.baseUrl}/add-new-battery`, battery, { headers });
  }

  public getIdBatteryByNumber(batteryNumber : number) : Observable<any>
  {
    const token = this.authService.getToken();

    if(!token)
      {
        throw new Error('Token was not found');
      }

      const headers = { Authorizaton : `Bearer ${token}` };

      return this.http.get<any>(`${this.baseUrl}/get-id-battery-by-number/${batteryNumber}`, {headers});
  }

  public getBatteryById(idBattery : number) : Observable<Battery>
  {
    const token = this.authService.getToken();

    if(!token)
      {
        throw new Error('Token was not found');
      }

      const headers = { Authorization : `Bearer ${token}` };

      return this.http.get<Battery>(`${this.baseUrl}/get-battery-by-id/${idBattery}`, { headers });
  }

  public allBattery() : Observable<BatteryResponse>
  {
    const headers = this.getHeaders();

    return this.http.get<BatteryResponse>(`${this.baseUrl}/all-battery`, {headers});
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
