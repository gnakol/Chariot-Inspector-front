import { TeamDTO } from "./team";

export interface TeamResponse {
    content: TeamDTO[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }