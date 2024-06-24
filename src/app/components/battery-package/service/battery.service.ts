import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Battery } from '../bean/battery';
import { AuthService } from '../../../authenticate/core/auth.service';

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
  
}
