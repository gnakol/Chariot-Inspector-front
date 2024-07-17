import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShiftDTO } from '../bean/shift'; // Assurez-vous que Shift est correctement défini dans bean/shift.ts

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private baseUrl = 'http://localhost:9001/chariot-inspector/shift';

  constructor(private http: HttpClient) { }

  getShiftById(idShift: number): Observable<ShiftDTO> {
    
    const token = localStorage.getItem('token');

    const headers = this.getHeaders();

    return this.http.get<ShiftDTO>(`${this.baseUrl}/get-shift-by-id/${idShift}`, {headers});
  }

  getAllShifts(): Observable<ShiftDTO[]> {
    return this.http.get<ShiftDTO[]>(`${this.baseUrl}/all-shift`);
  }

  addNewShift(shift: ShiftDTO): Observable<ShiftDTO> {
    return this.http.post<ShiftDTO>(`${this.baseUrl}/add-new-shift`, shift);
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
