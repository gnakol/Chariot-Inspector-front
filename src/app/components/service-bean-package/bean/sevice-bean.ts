export interface AccountServiceDTO
{
    idAccountService : number,

    name : string,

    wareHouseId : number
}

export interface AccountServiceResponse {
    content: AccountServiceDTO[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }