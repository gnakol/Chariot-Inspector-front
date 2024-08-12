import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ManufacturerDTO, ManufacturerResponse } from '../bean/manufacturer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  private baseUrlManufacturer = 'http://localhost:9001/chariot-inspector/manufacturer';

  constructor(private http : HttpClient) { }

  addNewManufacturer(manufacturer : ManufacturerDTO) : Observable<ManufacturerDTO>
  {
    const headers = this.getHeaders();

    return this.http.post<ManufacturerDTO>(`${this.baseUrlManufacturer}/add-new-manufacturer`, manufacturer, {headers});
  }

  allManufacturer() : Observable<ManufacturerResponse> 
  {
    const headers = this.getHeaders(); 

    return this.http.get<ManufacturerResponse>(`${this.baseUrlManufacturer}/all-manufacturer`, {headers});
  }

  getManufacturerById(idManufacturer : number) : Observable<ManufacturerDTO>
  {
    const headers = this.getHeaders();

    return this.http.get<ManufacturerDTO>(`${this.baseUrlManufacturer}/get-by-id-manufacturer/${idManufacturer}`, {headers});
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
