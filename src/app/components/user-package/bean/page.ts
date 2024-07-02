import { Account } from "./account";

export interface AccountResponse {
    content: Account[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }