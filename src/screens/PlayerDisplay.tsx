import React, { useState } from "react";
import { Button, ButtonGroup, CardDeck, Col, Container, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import { PlayingCard } from "../common/card";
import { Game } from "../common/game";
import { Player } from "../common/player";
import { CardDeckDisplay } from "../components/CardDisplay";

export type PlayerDisplayProps = {
    game: Game;
    player: Player;
    onTakeCard: () => (void);
    onNextPlayer: () => (void);
}

export function PlayerDisplay({ game, player, onTakeCard, onNextPlayer,  }: PlayerDisplayProps) {

    const [currentCard, setCurrentCard] = useState<PlayingCard>();
        
    function renderTakeButton() {
        if(!player.mustPass() && !game.gameOver) {
            return <Button variant="outline-primary" className='mx-2' onClick={e => onTakeCard()}>Take another Card</Button>
        } else {
            return undefined;
        }
    }

    function renderPassButton() {
        if(player.cardsTemp.length > 0 && !game.gameOver) {
            return <Button className='m-2' onClick={e => onNextPlayer()}>Pass</Button>;
        } else {
            return undefined;
        }
    }
    return <>{game.gameStarted ?
        <Container fluid="md" >
            <Row>
                <Col>
                    <h3>Cards this turn</h3>
                    <CardDeckDisplay cards={player.cardsTemp} />
                </Col>
            </Row>
            <Row className='p-5'>
                <Col>
                    {renderTakeButton()}
                    {renderPassButton()}
                    </Col>
            </Row>
            <Row>
                <Col>
                    <h3>All my cards</h3>
                    <CardDeckDisplay cards={player.cards} />
                </Col>
            </Row>
        </Container>
    :
    undefined}
    </>
}