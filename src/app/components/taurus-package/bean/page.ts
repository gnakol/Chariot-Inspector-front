import { TaurusUsage } from "./taurusUsage";

export interface TaurusUsageResponse {
    content: TaurusUsage[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }