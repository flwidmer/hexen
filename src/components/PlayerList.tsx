import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Game } from '../common/game';

type PlayerListProps = {
    game: Game;

}

export function PlayerList({ game }: PlayerListProps) {
    return <ListGroup className='m-3'>
        {
            game.players.map(p => {
              return <ListGroup.Item active={p === game.findCurrentPlayer()}>{p.name} {p.cards.length}</ListGroup.Item>
            })
        }
    </ListGroup>
}