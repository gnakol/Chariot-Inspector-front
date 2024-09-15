export interface Pickup{

    idPickup : number;

    accountId : number;

    cartId : number;

    pickupDateTime : Date;
    
    returnDateTime : Date;

    workSessionId? : string;

    conditionChassis: string;

    wheelsTornPlat: string;

    batteryCablesSockets: string;

    cleanNonSlipPlatform: string;

    windshield: string;

    gasBlockStrap: string;

    forwardReverseControl: string;

    honk: string;

    functionalElevationSystem: string;

    emergencyStop: string;

    noLeak: string;

    antiCrushButton: string;
    
    conditionForks: string;
}

export interface PickupResponse {
    content: Pickup[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }