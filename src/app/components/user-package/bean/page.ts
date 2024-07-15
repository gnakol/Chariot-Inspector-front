import { Account, AccountDTO } from "./account";

export interface AccountResponse {
  content: AccountDTO[];
  pageable: any;
  totalElements: number;
  totalPages: number;
  last: boolean;
}