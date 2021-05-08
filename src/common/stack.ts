import { nullCard, PlayingCard } from './card';
import hexe from '../images/hexe.jpg';
import cacao from '../images/cacao.jpg';
import vanilla from '../images/vanilla.jpg';
import milk from '../images/milch.jpg';
import nuts from '../images/nuts.jpg';
import sugar from '../images/sugar.jpg';
import butter from '../images/butter.jpg';


export function initializeStack(): PlayingCard[] {
    const cards: PlayingCard[] = [];
    pushN(20, cards, createHexe);

    pushN(20, cards, createHexe);
    pushN(7, cards, createCacao);
    pushN(7, cards, createMilk);
    pushN(7, cards, createButter);
    pushN(7, cards, createNuts);
    pushN(6, cards, createSugar);
    pushN(6, cards, createVanilla);
    return shuffleStack(cards);
}

function pushN(n: Number, stack: PlayingCard[], producer: () => PlayingCard) {
    
    Array(n).fill(1).forEach(element => {
        stack.push(producer())
    });
}

function createHexe(): PlayingCard {
    return new PlayingCard("Hexe", 6, true, hexe);
}

function createCacao(): PlayingCard {
    return new PlayingCard("Cacao", 0, false,cacao);
}

function createSugar(): PlayingCard {
    return new PlayingCard("Sugar", 1, false, sugar);
}

function createButter(): PlayingCard {
    return new PlayingCard("Butter", 2, false, butter);
}

function createVanilla(): PlayingCard {
    return new PlayingCard("Vanilla", 3, false, vanilla);
}

function createNuts(): PlayingCard {
    return new PlayingCard("Nuts", 4, false, nuts);
}

function createMilk(): PlayingCard {
    return new PlayingCard("Milk", 5, false, milk);
}


export function shuffleStack(array: Array<PlayingCard>) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    
    return [nullCard, ...array];
  }
  