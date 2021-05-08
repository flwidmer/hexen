import React, { useState } from "react";
import { Card, CardDeck, Col } from "react-bootstrap";
import { PlayingCard } from "../common/card"

export type CardDeckDisplayProps = {
    cards: PlayingCard[];
}

export function CardDeckDisplay({ cards }: CardDeckDisplayProps) {
    return <>
        <CardDeck>{
            cards.map(e => {
                return <>
                    <Col className='p-1'>
                        <Card border="primary" style={{ width: '10rem' }}>
                            <Card.Img src={e.image} />
                            <Card.ImgOverlay>
                                <Card.Title>{e.name} </Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                </>
            })}
        </CardDeck>
    </>
}