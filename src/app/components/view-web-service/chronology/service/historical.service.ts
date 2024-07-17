import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../../authenticate/core/auth.service';
import { Observable } from 'rxjs';
import { HistoryEntryDTO, Page } from '../bean/page';

@Injectable({
  providedIn: 'root'
})
export class HistoricalService {
  private baseUrlHistory = 'http://localhost:9001/chariot-inspector/history';

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getHistory(idAccount: number, page: number, size: number): Observable<Page<HistoryEntryDTO>> {
    
    const token = this.authService.getToken();

    if (!token) {
      throw new Error('Token was not found');
    }

    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    return this.http.get<Page<HistoryEntryDTO>>(`${this.baseUrlHistory}/all-history/${idAccount}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: params
    });
  }
}
