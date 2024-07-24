export interface ActionCarriedOutDTO{

    idActionCarriedOut : number,

    description : string, 

    issueId : number,

    accountId : number
}

export interface ActionCarriedOutResponse {
    content: ActionCarriedOutDTO[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }