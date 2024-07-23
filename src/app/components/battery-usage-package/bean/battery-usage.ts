export interface BatteryUsage {
    idBatteryUsage: number;
    cartId: number;
    batteryId: number;
    changeTime: Date;
    chargeLevel: number;
    state: string;
    workSessionId: string;
  }
  
  export interface BatteryUsageResponse {
    content: BatteryUsage[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }
  