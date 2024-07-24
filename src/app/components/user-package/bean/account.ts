import { Role } from "../../role-package/bean/role";

export interface Account{

      idAccount : number;

      name : string;

      firstName : string;

      email : string;

      password : string;

      service : string;

      civility : string;

      //taurusNumber : number;
      
      //pickUpDateTime : Date;

      //function : string;
}

export interface AccountDTO {

      idAccount: number;

      name: string;

      firstName: string;

      email: string;

      password: string;

      service: string;

      civility: string;

      roleDTOS: Role[];
    }