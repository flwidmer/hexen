import produce from "immer";
import { PlayingCard } from "./card";
import { Item } from "./item";
import { nullPlayer, Player } from "./player";
import { initializeStack, shuffleStack } from "./stack";


export class Game extends Item {
    players: Player[];
    stack: PlayingCard[];
    discardedStack: PlayingCard[];
    winner: string;
    gameStarted: boolean;
    gameOver: boolean;
    gameMessage: string;

    constructor() {
        super();
        this.players = [];
        this.stack = [];
        this.discardedStack = [];
        this.winner = '';
        this.gameStarted = false;
        this.gameOver = false;
        this.gameMessage = '';
    }

    // State evaluations

    canStart() {
        return this.players.length >= 2;
    }

    findCurrentPlayer() {
        const player = this.players.find(i => i.active);
        if (!player) {
            return nullPlayer;
        } else {
            return player;
        }
    }

    //state change

    takeCard(): Game {
        const newGame = produce(this, d => {
            d.gameMessage = '';
            const p = d.findCurrentPlayer();
            if (!p) {
                throw new Error('could not find active player');
            }
            if (d.stack.length === 0) {
                if (d.discardedStack.length === 0) {
                    // Game over
                    d.gameOver = true;
                    d.winner = 'Nobody';
                    d.gameMessage = 'All cards used';
                }
                const newShuffled = shuffleStack(d.discardedStack);
                d.discardedStack = [];
                d.stack = newShuffled;

            }
            const c = d['stack'].pop();
            if (!c) {
                throw new Error('Even after reshuffle, the stack was empty');
            } else {
                p.cardsTemp.push(c);
            }
            //TODO Check win condition
            if(p.hasWon()) {
                d.gameOver = true;
                d.winner = p.name;
                d.gameMessage = `${d.winner} has won!`;
            }
        });
        return newGame;
    }

    start() {
        const newGame = produce(this, d => {
            d.gameMessage = '';
            if (d.gameStarted) {
                return;
            } else if (d.players.length > 1) {
                d.players[0].active = true;
                d.gameStarted = true;
                d.stack = initializeStack();
            } else {
                d.gameStarted = false;
                d.gameMessage = 'Not enough players';
            }
        });
        return newGame;
    }

    addPlayer(playerName: string) {
        const newGame = produce(this, d => {
            d.gameMessage = '';
            if (d.gameStarted) {
                return;
            } else if (playerName.length < 3) {
                //TODO or choose from fake name list.
                d.gameMessage = 'Name not long enough';
            } else {
                d.players.push(new Player(playerName));
            }
        });
        return newGame;
    }

    pass() {
        const newGame = produce(this, d => {
            const p = d.findCurrentPlayer();
            if(p.mustPass()) {
                p.cardsTemp.forEach(e => {
                    d.discardedStack.push(e);
                });
            } else {
                p.cardsTemp.forEach(e => {
                    if(p.cards.find(c => c.id === e.id)) {
                        d.discardedStack.push(e);
                    } else {
                        p.cards.push(e);
                    }
                });
            }
            p.cardsTemp = [];
            // find next active player
            const currentIndex = d.players.indexOf(p);
            const nextIndex = (currentIndex + 1) % d.players.length;
            d.players[currentIndex].active = false;
            d.players[nextIndex].active = true;
        });
        return newGame;
    }
}
