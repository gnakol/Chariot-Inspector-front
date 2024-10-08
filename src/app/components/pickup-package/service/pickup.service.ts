import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../authenticate/core/auth.service';
import { Pickup, PickupResponse } from '../bean/pickup';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PickupService {

  private baseUrlPickup = 'http://localhost:9001/chariot-inspector/pickup';

  constructor(private http : HttpClient, private authService : AuthService) { }

  public addNewPickup(pickup : Pickup) : Observable<Pickup>
  {
    const token = this.authService.getToken();

    const workSessionId = localStorage.getItem('workSessionId');

    if(workSessionId)
    {
      pickup.workSessionId = workSessionId;
    }

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

  getIdPickupByCartNumber(cartNumber: string): Observable<number[]> {
    const token = this.authService.getToken();

    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<number[]>(`${this.baseUrlPickup}/get-id-pickup-by-cart-number?cartNumber=${cartNumber}`, { headers });
  }

  getPickupById(idPickup : number) : Observable<Pickup>
  {
    const headers = this.getHeaders();

    return this.http.get<Pickup>(`${this.baseUrlPickup}/get-pickup-by-id/${idPickup}`, {headers});
  }

  takePickupByWorkSessionId(workSessionId : string) : Observable<Pickup>
  {
    const headers = this.getHeaders();

    return this.http.get<Pickup>(`${this.baseUrlPickup}/take-pickup-by-work-session-id?workSessionId=${workSessionId}`, {headers});
  }

  getRelevantFields(cartId: number): Observable<Map<string, boolean>> {

    const headers = this.getHeaders();
    
    return this.http.get<Map<string, boolean>>(`${this.baseUrlPickup}/relevant-fields/${cartId}`, { headers });
  }

  removePickup(idPickup : number) : Observable<any> 
  {
    const headers = this.getHeaders();

    return this.http.delete<any>(`${this.baseUrlPickup}/remove-pickup-by-id/${idPickup}`, { headers, responseType: 'text' as 'json' });
  }

  updatePickup(pickup : Pickup) : Observable<Pickup>
  {
    const headers = this.getHeaders();

    return this.http.put<Pickup>(`${this.baseUrlPickup}/update-new-pickup/${pickup.idPickup}`, pickup, {headers});
  }

  allPickups() : Observable<PickupResponse>
  {
    const headers = this.getHeaders();

    return this.http.get<PickupResponse>(`${this.baseUrlPickup}/all-pickup`, {headers});
  }

  filterPickups(search: string): Observable<Pickup[]> {
    const headers = this.getHeaders();
    return this.http.get<Pickup[]>(`${this.baseUrlPickup}/all-pickup-filter?search=${search}`, { headers });
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