import { Cart } from "../../cart-package/bean/cart";

export interface Battery {

  idBattery: number;

  refBattery: string;

  batteryNumber: number;

  chargeLevel: number;

  state: string;
  
  idCart: number;
}
