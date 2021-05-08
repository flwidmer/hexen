import { Item } from "./item";
export class PlayingCard extends Item {
    name: string;
    id: number;
    hexe: boolean;
    image: string;
    
    constructor(name: string, id: number, hexe: boolean, image: string) {
        super();
        this.name = name;
        this.id = id;
        this.hexe = hexe;
        this.image = image;
    }
}


export const nullCard = new PlayingCard('NULL', -1, false, '');