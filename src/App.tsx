import React, { useEffect, useState } from 'react';
import './App.css';
import { PlayingCard } from './common/card';
import { initializeStack } from './common/stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nullPlayer, Player } from './common/player';
import { PlayerDisplay } from './screens/PlayerDisplay';
import { Alert, Button, Col, Container, Form, ListGroup, Row,Navbar } from 'react-bootstrap';
import { Game } from './common/game';
import { TopButtons } from './components/TopButtons';
import { PlayerList } from './components/PlayerList';
// import 'common-web-frontend-styling/post-intranet.css';


function App() {

  const [game, setGame] = useState<Game>(() => new Game());


  function onTakeCard() {
    const g = game.takeCard();
    setGame(g);
  }

  function onStartGame() {
    const g = game.start();
    setGame(g);
  }

  function onAddPlayer(playerName: string) {
    const g = game.addPlayer(playerName);
    setGame(g);
  }

  function onPass() {
    const g = game.pass();
    setGame(g);
  }



  return (
    <div className="App">
      <Navbar bg="light">
        <Navbar.Brand>Hexen!</Navbar.Brand>
      </Navbar>
      {
        game.gameMessage ?
          <Alert>{game.gameMessage}</Alert> :
          undefined
      }
      <Container>
        <Row>
          <Col><TopButtons game={game} onAddPlayer={onAddPlayer} onStartGame={onStartGame} /></Col>
        </Row>
        <Row>
          <Col md={2}>
            <PlayerList game={game} />
          </Col>
          <Col >
            <PlayerDisplay game={game} player={game.findCurrentPlayer()} onTakeCard={onTakeCard} onNextPlayer={onPass}></PlayerDisplay>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

