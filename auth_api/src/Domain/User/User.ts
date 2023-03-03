export interface User {
    id: string;
    firstname:string;
    lastname:string;
    phone:string;
    roleId: number;
    addressId:string;
    mail:string;
    password:string;
    isdisabled:boolean;
    restaurantId?:string;
}
export class User implements User {
    constructor(
      public id: string,
      public roleId: number,
      public addressId: string,
      public firstname: string,
      public lastname: string,
      public phone: string,
      public mail: string,
      public password: string,
      public isdisabled: boolean,
      public restaurantId?: string
    ) {}
  }