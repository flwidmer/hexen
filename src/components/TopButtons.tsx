import React, { useState } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { Game } from "../common/game"


type TopButtonsProps = {
    game: Game;
    onStartGame: () => void;
    onAddPlayer: (name: string) => void;
}

export function TopButtons({ game, onStartGame, onAddPlayer }: TopButtonsProps) {

    const [playerName, setPlayerName] = useState('');

    function onAddButtonPressed() {
        if (playerName.length > 0) {
            onAddPlayer(playerName)
            setPlayerName('');
        }
    }

    function onPlayerNameChanged(e: React.ChangeEvent<HTMLInputElement>) {
        setPlayerName(e.currentTarget.value);
    }

    function renderStartButton() {
        if (game.canStart()) {
            return <Button onClick={onStartGame}>Start game</Button>
        } else {
            return <></>;
        }
    }

    return <Container>
        {!game.gameStarted ?
            <Row>
                <Col>
                <Container fluid="md">
                    <Row >
                        <Col className='p-5'>
                            <Form.Control type="text" placeholder="enter player name" onChange={onPlayerNameChanged} value={playerName}/>
                        </Col>
                        <Col className='p-5'>
                            <Button onClick={onAddButtonPressed}>Add player</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {renderStartButton()}
                        </Col>
                    </Row>
                </Container>
                </Col>
            </Row>
            : <></>
        }</Container>
}