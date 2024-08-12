export interface FuelTypeDTO
{
    idFuelType : number, 

    name : string
}

export interface FuelTypeResponse {
    content: FuelTypeDTO[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }