export interface User {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  roleId: number;
  mail: string;
  password: string;
}

export class User implements User {
  constructor(
    public id: string,
    public roleId: number,
    public firstname: string,
    public lastname: string,
    public phone: string,
    public mail: string,
    public password: string
  ) {}
}
