import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartCategoryDTO, CartCategoryResponse } from '../bean/cart-category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartCategoryService {

  private baseUrlCartCategory = 'http://localhost:9001/chariot-inspector/cart-category';

  constructor(private http: HttpClient) { }

  addNewCartCategory(cartCategory: CartCategoryDTO): Observable<CartCategoryDTO> {
    const headers = this.getHeaders();
    return this.http.post<CartCategoryDTO>(`${this.baseUrlCartCategory}/add-new-cart-category`, cartCategory, { headers });
  }

  allCartCategories(): Observable<CartCategoryResponse> {
    const headers = this.getHeaders();
    return this.http.get<CartCategoryResponse>(`${this.baseUrlCartCategory}/all-cart-category`, { headers });
  }

  deleteCartCategory(idCategory: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.baseUrlCartCategory}/delete-cart-category/${idCategory}`, { headers });
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
