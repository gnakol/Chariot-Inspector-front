import { Injectable } from '@angular/core';
import { Cart } from '../bean/cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../authenticate/core/auth.service';
import { Observable } from 'rxjs';

interface CartResponse{
  content : Cart[];

  pageable: any;

  totalElements: number;

  totalPages: number;

  last: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:9001/chariot-inspector/cart';

  constructor(private http : HttpClient, private authService : AuthService) { }

  public allCart() : Observable<CartResponse>
  {
    const token = this.authService.getToken();

    if(!token)
      {
        throw new Error('No token found');
      }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<CartResponse>(`${this.baseUrl}/all-cart`, { headers });

  }

  public addNewCart(cart: Cart): Observable<Cart> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<Cart>(`${this.baseUrl}/add-new-cart`, cart, { headers });
  }
  

  public getIdCartByNum(cartNumber : string) : Observable<any>
  {
    const token = this.authService.getToken();

    if(!token)
      {
        throw new Error('No token found');
      }

      const headers = { Authorization: `Bearer ${token}` };

      return this.http.get<any>(`${this.baseUrl}/get-id-cart-by-number?cartNumber=${cartNumber}`, {headers});
  }

  public getCartById(idCart : number) : Observable<any>
  {
    const token = this.authService.getToken();

    if(!token)
      {
        throw new Error('Token not found');
      }

      const headers = { Authorization: `Bearer ${token}` };

      return this.http.get<any>(`${this.baseUrl}/get-cart-by-id/${idCart}`, {headers});
  }

  removeCart(idCart : number) : Observable<any>
  {
    const headers = this.getHeaders();

    return this.http.delete<any>(`${this.baseUrl}/remove-cart/${idCart}`, { headers, responseType: 'text' as 'json' });
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
