export interface Adress {
  id: string;
  adress: string;
  codePostal: string;
  city: string;
  country: string;
}

export class Adress implements Adress {
  constructor(
    public id: string,
    public adress: string,
    public codePostal: string,
    public city: string,
    public country: string
  ) {}
}
