import { Menu } from "./Menu";
import { Item } from "./Item";

export interface Articles {
  menus: Menu[];
  items: Item[];
}

export class Articles implements Articles {
  constructor(public menus: Menu[], public items: Item[]) {}
}
