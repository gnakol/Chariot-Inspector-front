import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../authenticate/core/auth.service';
import { Pickup } from '../bean/pickup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PickupService {

  private baseUrlPickup = 'http://localhost:9001/chariot-inspector/pickup';

  constructor(private http : HttpClient, private authService : AuthService) { }

  public addNewPickup(pickup : Pickup) : Observable<Pickup>
  {
    const token = this.authService.getToken();

    if(!token)
      {
        throw new Error('Not token found');
      }

      const headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      });

      return this.http.post<Pickup>(`${this.baseUrlPickup}/add-new-pickup`, pickup, {headers});
  }
}