import { immerable } from "immer";
import { PlayingCard } from "./card";
import { Item } from "./item";

export class Player extends Item{

    name: string;
    cardsTemp: Array<PlayingCard>;
    cards: Array<PlayingCard>;
    active: boolean = false;
    
    constructor(name: string) {
        super();
        this.name = name;
        this.cards = [];
        this.cardsTemp = [];
    }

    mustPass() {
        return this.cardsTemp.filter(c => c.hexe).length > 0;
    }
    
    hasWon() {
        const cardIds = new Set();
        this.cardsTemp
            .map(c => c.id)
            .forEach(c => cardIds.add(c));
        this.cards
            .map(c => c.id)
            .forEach(c => cardIds.add(c));
        return cardIds.has(0) && cardIds.has(1) && cardIds.has(2) 
            && cardIds.has(3) && cardIds.has(4) && cardIds.has(5);
    }
}

export const nullPlayer = new Player('');