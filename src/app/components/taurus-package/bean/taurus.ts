export interface Taurus{

      idTaurus : number;

      refTaurus : string;

      taurusNumber : number;
}

export interface TaurusResponse {
      content: Taurus[];
      pageable: any;
      totalElements: number;
      totalPages: number;
      last: boolean;
    }