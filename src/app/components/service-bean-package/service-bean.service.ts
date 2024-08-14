import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountServiceDTO, AccountServiceResponse } from './bean/sevice-bean';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceBeanService {

  private baseUrlAccountServiceBean = 'http://localhost:9001/chariot-inspector/account-service-bean';

  constructor(private http : HttpClient) { }

  addNewAccountServiceBean(accountServiceBean : AccountServiceDTO) : Observable<AccountServiceDTO>
  {
    const headers = this.getHeaders();

    return this.http.post<AccountServiceDTO>(`${this.baseUrlAccountServiceBean}/add-new-account-service-bean`, accountServiceBean, {headers});
  }

  allAccountServiceBean(page: number = 0, size: number = 10) : Observable<AccountServiceResponse>
  {
    const headers = this.getHeaders();

    return this.http.get<AccountServiceResponse>(`${this.baseUrlAccountServiceBean}/all-account-service-bean`, {headers});
  }

  getByIdAllAccountServiceBean(idAccountServiceBean : number) : Observable<AccountServiceDTO>
  {
    const headers = this.getHeaders();

    return this.http.get<AccountServiceDTO>(`${this.baseUrlAccountServiceBean}/get-account-service-bean-by-id/${idAccountServiceBean}`, {headers});
  }

  deleteServiceBean(idServiceBean : number) : Observable<any>
  {
    const headers = this.getHeaders();

    return this.http.delete<any>(`${this.baseUrlAccountServiceBean}/remove-account-service-bean/${idServiceBean}`, { headers, responseType: 'text' as 'json' });
  }

  getServicesByWarehouseId(wareHouseId: number, page: number = 0, size: number = 10): Observable<AccountServiceResponse> {
    const headers = this.getHeaders();
    return this.http.get<AccountServiceResponse>(`${this.baseUrlAccountServiceBean}/get-all-services-bean-by-warehouse-id/${wareHouseId}`, { headers });
  }

  getAccountServiceBeanById(idAccountServiceBean : number) : Observable<AccountServiceDTO>
  {
    const headers = this.getHeaders();

    return this.http.get<AccountServiceDTO>(`${this.baseUrlAccountServiceBean}/get-account-service-bean-by-id/${idAccountServiceBean}`, {headers});
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
