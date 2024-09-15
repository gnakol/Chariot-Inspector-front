export interface Audit
{
     idAudit : number;

    goodPoints : string;

    improvementAreas : string;

    auditTime : string;

    status : string;

    findings : string;

    accountId : number;

    cartId : number;

    workSessionId : string;
}

export interface AuditResponse {
    content: Audit[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }