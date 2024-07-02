export interface Pickup{

    idPickup : number;

    accountId : number;

    cartId : number;

    pickupDateTime : Date;
    
    returnDateTime : Date;
}

interface PickupResponse {
    content: Pickup[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }