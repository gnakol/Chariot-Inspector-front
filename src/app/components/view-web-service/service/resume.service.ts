import { Injectable } from '@angular/core';
import { Account } from '../../user-package/bean/account';
import { Cart } from '../../cart-package/bean/cart';
import { Battery } from '../../battery-package/bean/battery';
import { TaurusUsage } from '../../taurus-package/bean/taurusUsage';
import { Pickup } from '../../pickup-package/bean/pickup';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private accountData: Account | null = null;

  private cartData: Cart | null = null;

  private batteryData: Battery | null = null;

  private taurusUsageData : TaurusUsage | null = null;

  private pickupData : Pickup | null = null;

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

  setTaurusUsageData(taurusUsage : TaurusUsage) : void
  {
    this.taurusUsageData = taurusUsage;
  }

  getCartData(): Cart | null {
    return this.cartData;
  }

  setBatteryData(battery: Battery): void {
    this.batteryData = battery;
  }

  getBatteryData(): Battery | null {
    return this.batteryData;
  }

  getTaurusUsageData() : TaurusUsage | null
  {
    return this.taurusUsageData;
  }

  setPickupData(pickup : Pickup) : void
  {
    this.pickupData = pickup;
  }

  getPickupData() : Pickup | null
  {
    return this.pickupData;
  }

  clearData(): void {
    this.accountData = null;
    this.cartData = null;
    this.batteryData = null;
    this.pickupData = null;
  }

  
}
