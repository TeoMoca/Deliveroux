export interface User {
    id: string;
    firstname:string;
    lastname:string;
    phone:string;
    roleId: number;
    addressId:number;
    mail:string;
    password:string;
    isSponsor:boolean
}

export class Users implements Users {
    constructor(
      public id: string,
      public roleId: number,
      public addressId: string,
      public firstname: string,
      public lastname: string,
      public phone: string,
      public mail: string,
      public password: string,
      public issponsor: boolean
    ) {}
  }