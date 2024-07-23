import { Cart } from "./cart";

export interface CartResponse {
    content: Cart[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }

  