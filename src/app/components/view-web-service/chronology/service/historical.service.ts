import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../../authenticate/core/auth.service';
import { Taurus, TaurusResponse } from '../../../taurus-package/bean/taurus';
import { Observable } from 'rxjs';
import { TaurusUsageResponse } from '../../../taurus-package/bean/page';
import { IssueResponse } from '../../../issue-package/bean/page';
import { CartResponse } from '../../../cart-package/bean/page';
import { BatteryResponse } from '../../../battery-package/bean/page';

@Injectable({
  providedIn: 'root'
})

export class HistoricalService {

  private baseUrlTaurusUsage = 'http://localhost:9001/chariot-inspector/taurus-usage';

  private baseUrlPickup = 'http://localhost:9001/chariot-inspector/pickup';

  private baseUrlIssue = 'http://localhost:9001/chariot-inspector/issue';

  private baseUrlBattery = 'http://localhost:9001/chariot-inspector/battery';


  

  constructor(private http : HttpClient, private authService : AuthService) { }

  public allTaurusByAccount(idAccount: number, page: number, size: number): Observable<TaurusResponse> {

    const token = this.authService.getToken();

    if(!token)
      {
        throw new Error('Token was not found');
      }

    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    return this.http.get<TaurusResponse>(`${this.baseUrlTaurusUsage}/all-taurus-by-account/${idAccount}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: params
    });
  }

  public allIssueByAccount(idAccount : number, page : number, size : number) : Observable<IssueResponse>
  {
    const token = this.authService.getToken();

    if(!token)
      {
        throw new Error('Token was not found');
      }

      let params = new HttpParams();
      params = params.append('page', page.toString());
      params = params.append('size', size.toString());

      return this.http.get<IssueResponse>(`${this.baseUrlIssue}/all-issue-by-account/${idAccount}`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        },
        params: params
      });
  }

  public allCartByAccount(idAccount : number, page : number, size : number) : Observable<CartResponse>
  {
    const token = this.authService.getToken();

    if(!token)
      {
        throw new Error('Token was not found');
      }

      let params = new HttpParams();
      params = params.append('page', page.toString());
      params = params.append('size', size.toString());

      return this.http.get<CartResponse>(`${this.baseUrlPickup}/all-cart-by-account/${idAccount}`, {
        headers : {
          'Authorization' : `Bearer ${token}`
        },
        params : params
      });
  }

  public allBatteryByCart(idCart : number, page : number, size : number) : Observable<BatteryResponse>
  {
    const token = this.authService.getToken();

    if(!token)
      {
        throw new Error('Token was not found');
      }

      let params = new HttpParams();
      params = params.append('page', page.toString());
      params = params.append('size', size.toString());

      return this.http.get<BatteryResponse>(`${this.baseUrlBattery}/all-battery-by-cart/${idCart}`, {
        headers : {
          'Authorization' : `Bearer ${token}`
        },
        params : params
      });
  }

  
}
