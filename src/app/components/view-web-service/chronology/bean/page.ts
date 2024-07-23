import { Battery } from "../../../battery-package/bean/battery";

export interface HistoryEntryDTO {

    name: string;

    firstName: string;

    taurusNumber: number | null;

    issueDescription: string | null;

    cartNumber: string | null;

    batteryDTOS: Battery[];

    usageDate: Date;

    teamName : string;

    shiftName : string;
  }

  export interface HistoryResponse {
      content: HistoryEntryDTO[];
      pageable: any;
      totalElements: number;
      totalPages: number;
      last: boolean;
    }