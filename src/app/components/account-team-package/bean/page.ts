import { AccountDTO } from "../../user-package/bean/account";

export interface AccountTeamResponse {
    content: AccountDTO[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }