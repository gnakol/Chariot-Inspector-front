import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuelTypeDTO, FuelTypeResponse } from '../bean/fuel-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuelTypeService {

  private baseUrlFuelType = 'http://localhost:9001/chariot-inspector/fuel-type';

  constructor(private http: HttpClient) { }

  addNewFuelType(fuelType: FuelTypeDTO): Observable<FuelTypeDTO> {
    const headers = this.getHeaders();
    return this.http.post<FuelTypeDTO>(`${this.baseUrlFuelType}/add-new-fuel-type`, fuelType, { headers });
  }

  allFuelTypes(): Observable<FuelTypeResponse> {
    const headers = this.getHeaders();
    return this.http.get<FuelTypeResponse>(`${this.baseUrlFuelType}/all-fuel-type`, { headers });
  }

  deleteFuelType(idFuelType: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.baseUrlFuelType}/delete-fuel-type/${idFuelType}`, { headers });
  }

  getIdFuelTypeByName(name : string) : Observable<number>
  {
    const headers = this.getHeaders();

    return this.http.get<number>(`${this.baseUrlFuelType}/get-fuel-type-id-by-name?name=${name}`, {headers});
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
