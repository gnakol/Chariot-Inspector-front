export interface AccountTeamDTO
{
    idAccountTeam? : number;

    accountId : number;

    teamId : number;

    shiftId : number;

    startDate : string;

    endDate : string;
    
    workSessionId? : string;
}