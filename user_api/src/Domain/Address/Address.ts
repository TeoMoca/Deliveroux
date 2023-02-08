export interface Address {
    id:string;
    address:string;
    codePostal:string;
    city:string;
    country:string;
}

export class Address implements Address {
    constructor(
        public id: string,
        public adress: string,
        public codePostal: string, 
        public city: string, 
        public country: string
    ){}
}