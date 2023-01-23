import React from 'react';
import Card from 'react-bootstrap/Card';
import "./card.css"

export default function cardCad(props) {

    return <Card className="card--container bg-secondary">
        <div className="card--titulo">
            <h1 className="card--tipo text-warning"><strong>{props.tipo}</strong></h1>
        </div>
        <Card.Body>
            <div className="card--body">
                <div className="div--card--nome">
                    <h3 className="card--nome">{props.nome}</h3>
                </div>

                <div className="div--card--tipo ">
                    <h3 className="card--prioridade">{props.horario} - {props.prioridade}</h3>

                </div>
            </div>


        </Card.Body>
    </Card>
}