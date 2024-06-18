import { Injectable } from '@angular/core';
import { Account } from '../../user-package/bean/Account';
import { Cart } from '../../cart-package/bean/cart';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private accountData: Account | null = null;

  private cartData: Cart | null = null;

  constructor() { }

  setAccountData(account: Account): void {
    this.accountData = account;
  }

  getAccountData(): Account | null {
    return this.accountData;
  }

  setCartData(cart: Cart): void {
    this.cartData = cart;
  }

  getCartData(): Cart | null {
    return this.cartData;
  }

  clearData(): void {
    this.accountData = null;
    this.cartData = null;
  }

  
}
