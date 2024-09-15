import { AccountDTO } from "../../user-package/bean/account";
import { AccountTeamDTO } from "./account-team";

export interface AccountTeamResponse {
    content: AccountTeamDTO[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }