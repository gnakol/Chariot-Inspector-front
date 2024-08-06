import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WareHouseDTO, WareHouseResponse } from '../bean/ware-house';

@Injectable({
  providedIn: 'root'
})
export class WareHouseService {

  private baseUrlWareHouse = 'http://localhost:9001/chariot-inspector/ware-house';

  constructor(private http : HttpClient) { }

  getAllWareHouse() : Observable<WareHouseResponse>
  {
    const headers = this.getHeaders();

    return this.http.get<WareHouseResponse>(`${this.baseUrlWareHouse}/all-ware-house`, {headers});
  }

  addNewWareHouse(wareHouse : WareHouseDTO) : Observable<WareHouseDTO>
  {
    const headers = this.getHeaders();

    return this.http.post<WareHouseDTO>(`${this.baseUrlWareHouse}/add-new-ware-house`, wareHouse, {headers});
  }

  getWareHouseById(idWareHouse : number) : Observable<WareHouseDTO>
  {
    const headers = this.getHeaders();

    return this.http.get<WareHouseDTO>(`${this.baseUrlWareHouse}/get-by-id-ware-house/${idWareHouse}`, {headers});
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
