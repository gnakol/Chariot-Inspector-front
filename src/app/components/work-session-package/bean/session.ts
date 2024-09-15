export interface WorkSession {

    idWorkSession: number;

    accountId: number;

    workSessionId: string;

    startTime: Date;

    endTime: Date;
  }
  


export interface WorkSessionResponse {
    content: WorkSession[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }