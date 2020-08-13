import React from "react";

import {Card,ListGroup,ListGroupItem} from 'react-bootstrap';

export default function ProductCard({name, price, img}){
    return(
        <div>
            <Card style={{ width: '18rem',margin:'100px' }}>
                <Card.Img variant="top" src={"https://i.ibb.co/jhJXXRv/Botella-vino-1.jpg"} style={{padding:"20px"}}/>
                <Card.Body>
                    <Card.Title>Vino Henry</Card.Title>
                    <ListGroupItem style={{border:"0px",padding:"0px"}}>Bodeguita Sanjuanina</ListGroupItem>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem><strong>4.000 USD</strong></ListGroupItem>
                </ListGroup>
            </Card>
        </div>
    );
}




