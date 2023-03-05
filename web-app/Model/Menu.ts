import { Item } from "./Item";
export interface Menu {
  objectid: string;
  id: number;
  id_restaurant: string;
  name: string;
  picture: string;
  description: string;
  price: number;
  quantity: number;
  items: Item[];
}

export class Menu implements Menu {
  constructor(
    public objectid: string,
    public id: number,
    public id_restaurant: string,
    public name: string,
    public picture: string,
    public description: string,
    public price: number,
    public quantity: number,
    public items: Item[]
  ) {}
}
