import { Issue } from "./issue";

export interface IssueResponse {
    content: Issue[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }