export interface WareHouseDTO
{
    idWareHouse : number,

    name : string
}

export interface WareHouseResponse {
    content: WareHouseDTO[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }