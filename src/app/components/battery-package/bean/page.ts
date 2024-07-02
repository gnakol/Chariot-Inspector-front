import { Battery } from "./battery";

export interface BatteryResponse {
    content: Battery[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }