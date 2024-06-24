import { Cart } from "../../cart-package/bean/cart";

export interface Battery {

  idBattery: number;

  refBattery: string;

  batteryNumber: number;

  chargeLevel: number;

  state: string;
  
  cart: Cart | null; // Utilisez cart pour représenter la relation avec le chariot
}
