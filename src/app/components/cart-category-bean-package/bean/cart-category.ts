export interface CartCategoryDTO
{
    idCategory : number, 

    name : string
}

export interface CartCategoryResponse {
    content: CartCategoryDTO[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }