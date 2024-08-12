export interface ManufacturerDTO
{
    idManufacturer : number,

    name : string
}

export interface ManufacturerResponse {
    content: ManufacturerDTO[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }