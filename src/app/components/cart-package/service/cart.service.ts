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

  private baseUrlPickup = 'http://localhost:9001/chariot-inspector/pickup';

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

  
}
