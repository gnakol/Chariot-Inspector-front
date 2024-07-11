export interface Issue{

    idIssue : number;

    description : string;

    createdAt : Date;

    accountId : number;

    workSessionId? : string;
}