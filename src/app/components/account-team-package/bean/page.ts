import { AccountTeam } from "./account-team";

export interface AccountTeamResponse {
    content: AccountTeam[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }